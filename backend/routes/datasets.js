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

router.post('/datasets/search', async (req, res) => {
    const { endDate, minRows, maxRows, language, tags} = req.body; // Destructure the search filters from request body
    let query = 'SELECT * FROM datasets WHERE 1=1';
    let queryParams = [];

    // Convert endDate from 'DD/MM/YYYY' to 'YYYY-MM-DD', if date filter is provided
    if (endDate) {
        const [day, month, year] = endDate.split('/');
        const formattedEndDate = `${year}-${month}-${day}`; // Reformat to 'YYYY-MM-DD'
        queryParams.push(formattedEndDate);
        query += ` AND date_posted >= $${queryParams.length}`; // may need TO_DATE($${queryParams.length}, 'DD/MM/YYYY' if python doesnt convert
    }

    // Add filters to query if they are provided, for other filters
    if (minRows) {
        queryParams.push(minRows);
        query += ` AND number_of_rows >= $${queryParams.length}`;
    }

    if (maxRows) {
        queryParams.push(maxRows);
        query += ` AND number_of_rows <= $${queryParams.length}`;
    }

    if (language) {
        queryParams.push(language);
        query += ` AND language = $${queryParams.length}`;
    }

    // Multi-select filter for tags
    if (tags && Array.isArray(tags) && tags.length > 0) {
        queryParams.push(tags);
        query += ` AND tags && $${queryParams.length}::text[]`; // match any of the tags with && $N::text[]
    }

    try {
        const result = await pool.query(query, queryParams); // Execute the query with parameters
        res.json(result.rows);  // Send the filtered datasets back to the client
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
