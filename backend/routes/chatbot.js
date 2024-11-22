const express = require('express');
const router = express.Router();
const axios = require('axios');

// Replace with the Flask app URL
const FLASK_CHATBOT_URL = 'https://openfeedbackvault.utm.utoronto.ca/chat';

router.post('/chat', async (req, res) => {
    const { message } = req.body; // Expecting a 'message' field in the request body

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Invalid input format. 'message' should be a non-empty string." });
    }

    try {
        // Send the user's message to the Flask app
        const response = await axios.post(FLASK_CHATBOT_URL, { question: message });

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
