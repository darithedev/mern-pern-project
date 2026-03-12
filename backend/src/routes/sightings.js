import express from 'express'
import pool from '../db/pools.js'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM sightings`);
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

export default router;