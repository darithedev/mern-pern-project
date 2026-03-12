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

export default router;