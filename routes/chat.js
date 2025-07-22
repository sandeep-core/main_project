
const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const API_KEY = process.env.OPENROUTER_API_KEY;

router.post('/', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          { role: 'user', content: prompt }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3001/',  // replace if hosted
          'X-Title': 'Waste2Wing Chatbot'
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    console.log("OpenRouter Response:", reply);
    res.json({ reply });

  } catch (err) {
    console.error('OpenRouter error:', err.response?.data || err.message);
    res.status(500).json({ error: 'OpenRouter API failed' });
  }
});

module.exports = router;
