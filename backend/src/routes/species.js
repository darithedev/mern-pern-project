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

router.post('/', async (req, res) => {
    try {
        const { common_name, scientific_name, estimated_in_the_wild, conservation_code } = req.body;
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