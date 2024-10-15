const express = require('express');
const router = express.Router();  // Create a new router object
const { Pool } = require('pg');

// Create a PostgreSQL connection pool (optional: can be moved to another config file)
const pool = new Pool({
    user: 'feedback',      // Your PostgreSQL username
    host: 'localhost',     // Host of your database
    database: 'feedback',  // Name of your PostgreSQL database
    password: 'letmein888', // Your PostgreSQL password
    port: 5432,            // PostgreSQL port
});

// Define the API route to retrieve datasets
router.get('/datasets', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM datasets');
        res.json(result.rows);  // Send data back to client
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
