import express from 'express'
import pool from '../db/pools.js'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM individuals`);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error with getting all individual endangered animals.', error);
        res.status(500).json({ error: 'Error! Could not get individual endangered animals' });
    }
});

export default router;