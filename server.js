require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const apiKey = process.env.OPENWEATHERMAP_API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    const { location } = req.query;
    try {
        const response = await fetch(`${apiUrl}?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        
        if (data.cod !== 200) {
            throw new Error(data.message || "Failed to fetch weather data");
        }
        
        res.json(data);
    } catch (error) {
        console.error("API Error:", error.message);
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`SunTracker server is warming up at http://localhost:${port} ☀️`);
});