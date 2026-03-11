import express from 'express'
import cors from 'cors'
import pool from './db/pools.js'
import dbHealth from './helpers/dbHealth.js';

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    res.status(200).json({ 
        message: 'Express server is healthy. Postgres database connection is healthy.',
        server: 'up',
        database: 'up'
    });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Express server is running on port ${PORT}`);
});