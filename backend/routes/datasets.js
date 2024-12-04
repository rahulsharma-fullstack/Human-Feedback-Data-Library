const express = require('express');
const router = express.Router();  // Create a new router object
const { Pool } = require('pg');
const axios = require('axios');

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
    const { endDate, minRows, maxRows, language, tags , tagsLogic} = req.body; // Destructure the search filters from request body
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

    // Multi-select filter for tags with AND/OR logic
    if (tags && Array.isArray(tags) && tags.length > 0) {
        if (tagsLogic === 'AND') {
            // Match all selected tags (intersection logic)
            query += ` AND tags @> $${queryParams.length + 1}::text[]`; // Use @> operator for array containment
            queryParams.push(tags);
        } else if (tagsLogic === 'OR' || !tagsLogic) {
            // Match any of the selected tags (union logic)
            query += ` AND tags && $${queryParams.length + 1}::text[]`; // Use && operator for array overlap
            queryParams.push(tags);
        }
    }
    

    try {
        const result = await pool.query(query, queryParams); // Execute the query with parameters
        res.json(result.rows);  // Send the filtered datasets back to the client
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Replace with the Flask app URL
const FLASK_CHATBOT_URL = 'https://openfeedbackvault.utm.utoronto.ca/chat';

router.post('/chat', async (req, res) => {
    const { message } = req.body; // Expecting a 'message' field in the request body
    console.log(req.body);

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Invalid input format. 'message' should be a non-empty string." });
    }

    try {
        // Fetch the API key from environment variables
        const apiKey = process.env.API_KEY;

        // Send the user's message to the Flask app with the API key
        const response = await axios.post(FLASK_CHATBOT_URL,
            { question: message },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': apiKey  // Include the API key in the request header
                }
            });

        // Extract the reply from the Flask app's response
        const reply = response.data.reply;

        // Send the reply back to the frontend
        res.status(200).json({ reply });
    } catch (error) {
        console.error('Error communicating with Flask chatbot:', error.message || error.response?.data);
        res.status(500).json({ error: 'Failed to fetch response from chatbot.' });
    }
});
module.exports = router;
