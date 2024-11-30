const express = require('express');
const cors = require('cors');

// Import the routes
const datasetsRoute = require('./routes/datasets');

const app = express();
app.use(cors());
app.use(express.json());  // To parse JSON request bodies
app.options('*', cors());  // Enable pre-flight across-the-board

// Middleware to validate requests only from your website
app.use((req, res, next) => {
    const allowedOrigin = 'https://openfeedbackvault.utm.utoronto.ca'; // Replace with your website's domain

    const origin = req.get('Origin') || req.get('Referer'); // Check both Origin and Referer headers
    console.log(origin)
    if (origin && origin.startsWith(allowedOrigin)) {
        next(); // Allow the request
    } else {
        res.status(403).json({ error: 'Forbidden: Access is restricted to requests from the official website.' });
    }
});

// Use the routes
app.use('/api', datasetsRoute); // Route for datasets

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
