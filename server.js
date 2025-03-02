const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

const GEMINI_API_KEY = "AIzaSyBlq-m5nwyoPp-P4bIZGPJ1UMLoJUVaWbk";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-8b:generateContent";

// Function to call Gemini API
async function callGeminiAPI(prompt) {
    try {
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 1,
                    topP: 0.95,
                    topK: 40,
                    maxOutputTokens: 8192
                }
            }
        );
        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error calling Gemini API:', error.response?.data || error.message);
        throw error;
    }
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, cdp } = req.body;
        
        const systemPrompt = `You are an AI assistant specializing in CDP (Customer Data Platform) documentation. Your task is to provide accurate information from these documentation sources:
        - Segment: https://segment.com/docs/
        - mParticle: https://docs.mparticle.com/
        - Lytics: https://docs.lytics.com/
        - Zeotap: https://docs.zeotap.com/
        Please provide clear, concise, and accurate responses based on the official documentation.`;

        const fullPrompt = `${systemPrompt}\nQuestion: ${message}\nAnswer:`;
        
        const response = await callGeminiAPI(fullPrompt);
        res.json({ message: response });
    } catch (error) {
        console.error('Error in chat endpoint:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Scraping endpoint
app.post('/api/scrape', async (req, res) => {
    try {
        const { cdp, query, url } = req.body;

        // Fetch the documentation page
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Enhanced scraping logic
        const relevantText = $('p, h1, h2, h3, h4, h5, h6, li')
            .map((_, el) => $(el).text())
            .get()
            .join('\n');

        // Use Gemini to process the scraped content
        const prompt = `Based on this documentation content from ${cdp}:\n\n${relevantText}\n\nAnswer this question: ${query}`;
        const aiResponse = await callGeminiAPI(prompt);

        res.json({ message: aiResponse });
    } catch (error) {
        console.error('Error in scrape endpoint:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({
        error: 'Internal server error',
        details: err.message
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 