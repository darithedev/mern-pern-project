import express from 'express'
import pool from '../db/pools.js'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM species`);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error with getting all species', error);
        res.status(500).json({ error: 'Error! Could not get species' });
    }
});

// This likely will be admin route only where admin can add an endangered species / auth protected route
router.post('/', async (req, res) => {
    try {
        const { common_name, scientific_name, estimated_in_the_wild, conservation_code } = req.body;

        if (!common_name){
            return res.status(400).json({
                error: "A common name for this endangered animal is required!"
            });
        }

        if (!scientific_name) {
            return res.status(400).json({
                error: "A scientific name for this endangered animal is required!"
            });
        }

        if (!estimated_in_the_wild || typeof(estimated_in_the_wild) !== 'number') {
            return res.status(400).json({
                error: "Estimated amount must be an integer!"
            });
        };

        if (!conservation_code || conservation_code.length !== 2) {
            return res.status(400).json({
                error: "A 2 character conservation code for this endangered animal is required!"
            });
        }

        const result = await pool.query(
            `INSERT INTO species (common_name, scientific_name, estimated_in_the_wild, conservation_code)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [common_name, scientific_name, estimated_in_the_wild, conservation_code]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error with adding this specie.', error);
        res.status(500).json({ error: 'Error! Could not add this specie.' });
    }
});

export default router;