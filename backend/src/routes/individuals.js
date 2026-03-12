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

router.post('/', async (req, res) => {
    try {
        const { nick_name, scientist_tracking, species_id } = req.body;

        if (!nick_name || nick_name.length <= 3) {
            return res.status(400).json({
                error: "A nickname for this endangered animal is required and must be more than 3 characters!"
            });
        };

        if (!scientist_tracking || typeof(scientist_tracking || scientist_tracking.lenght <= 3) !== 'string') {
            return res.status(400).json({
                error: "Your first and last name is required, must be a string, and more than 3 characters!"
            });
        };

        const result = await pool.query(
            `INSERT INTO individuals (nick_name, scientist_tracking, species_id)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [nick_name, scientist_tracking, species_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error with adding individual endangered animal.', error.message);
        res.status(500).json({ error: 'Error! Could not add individual endangered animal.' });
    }
});

export default router;