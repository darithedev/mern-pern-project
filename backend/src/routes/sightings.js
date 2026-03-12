import express from 'express'
import pool from '../db/pools.js'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { start, end } = req.query;

        let sightingsQuery = `
            SELECT sightings.*, individuals.nick_name 
            FROM sightings
            JOIN individuals 
            ON sightings.individual_id = individuals.id
        `;
        let reqQuery = [];

        if (start && end) {
            sightingsQuery += `WHERE sightings.sighting BETWEEN $1 AND $2`;
            reqQuery = [start, end];
        }

        const result = await pool.query(sightingsQuery, reqQuery);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error with getting all sightings.', error);
        res.status(500).json({ error: 'Error! Could not get sightings.' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { sighting, individual_id, location, healthy, sighted_by_email } = req.body;

        if (!sighting || new Date(sighting).toString() === 'Invalid Date') {
            return res.status(400).json({
                error: "A valid date is required!"
            });
        };

        if (new Date(sighting) > new Date() ) {
            return res.status(400).json({
                error: "Date cannot be in the future!"
            });
        };

        if (!individual_id || isNaN(individual_id)) {
            return res.status(400).json({
                error: "Individual id is required and must be an integer!"
            });
        };

        if (!location || location.length <= 3) {
            return res.status(400).json({
                error: "A sighting location is required and be more than 3 characters!"
            });
        };

        if (typeof(healthy) !== 'boolean') {
            return res.status(400).json({
                error: "Healthy status is required!"
            });
        };

        if (!sighted_by_email || !sighted_by_email.includes('@')) {
            return res.status(400).json({
                error: "A valid email is required!"
            })
        }

        const result = await pool.query(
            `INSERT INTO sightings (sighting, individual_id, location, healthy, sighted_by_email)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [sighting, individual_id, location, healthy, sighted_by_email]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error with adding individual endangered animal.', error.message);
        res.status(500).json({ error: 'Error! Could not add individual endangered animal.' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { sighting, individual_id, location, healthy, sighted_by_email } = req.body;

        const result = await pool.query(
            `UPDATE sightings 
            SET sighting=$1, individual_id=$2, location=$3, healthy=$4, sighted_by_email=$5
            WHERE id=$6
            RETURNING *`,
            [sighting, individual_id, location, healthy, sighted_by_email, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                error: "This sighting could not be edited because it was not located!"
            });
        };

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('This sighting could not be located or edited!', error.message)
        res.status(500).json({ error: "Error! this sigting could not be located or edited!"})
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // deleted_sighting is a temporary result set for the deleted sighting
        // and is joined with the individuals table to access the individual animal's nick_name
        // This result set only exists in memory and will not be accessible after query ends
        const result = await pool.query(
            `WITH deleted_sighting AS (
                DELETE FROM sightings
                WHERE id=$1 
                RETURNING *
            )
            SELECT deleted_sighting.*, individuals.nick_name
            FROM deleted_sighting
            JOIN individuals 
            ON deleted_sighting.individual_id = individuals.id`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ 
                error: "This sighting could not be deleted because it was not located!"
            });
        };

        res.status(201).json({ 
            message: `The sighting for ${result.rows[0].nick_name} on date, ${result.rows[0].sighting.toDateString()} has been deleted.`
        });

    } catch (error) {
        console.error('Could not locate or delete this sighting.', error.message);
        res.status(500).json({ error: "Error! With locating or deleting this sighting!"});
    }
});

export default router;