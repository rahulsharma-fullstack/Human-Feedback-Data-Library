const express = require('express');
const cors = require('cors');

// Import the routes
const datasetsRoute = require('./routes/datasets');
const chatRoute = require('./routes/chat'); // Import the chatbot route

const app = express();
app.use(cors());
app.use(express.json());  // To parse JSON request bodies
app.options('*', cors());  // Enable pre-flight across-the-board

// Use the routes
app.use('/api/datasets', datasetsRoute); // Route for datasets
app.use('/api/chat', chatRoute);         // Route for chatbot

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
