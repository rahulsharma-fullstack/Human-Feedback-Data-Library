const express = require('express');
const cors = require('cors');

// Import the routes
const datasetsRoute = require('./routes/datasets');

const app = express();
app.use(cors());
app.use(express.json());  // To parse JSON request bodies
app.options('*', cors());  // Enable pre-flight across-the-board

// Use the datasets route for /api
app.use('/api', datasetsRoute);

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
