import express from 'express'
import cors from 'cors'
import pool from './db/pools.js'
import dbHealth from './helpers/dbHealth.js';

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/health', async (req, res) => {
    const db_status = await dbHealth();
    if (db_status) {
        res.status(200).json({ 
            message: 'Express server is healthy. Postgres database connection is healthy.',
            server: 'up',
            database: 'up'
        });
    } else {
        res.status(500).json({ 
            message: 'Express server is healthy. Postgres database connection is down.',
            server: 'up',
            database: 'down'
        });
    }
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Express server is running on port ${PORT}`);
});