require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

const PORT = 3000;
const API_KEY = process.env.API_KEY;

// Setup
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", { weather: null, error: null });
});

app.post("/", async (req, res) => {
    const city = req.body.city;
    if (!city) {
        return res.render("index", { weather: null, error: "Please enter a city name" });
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        const response = await axios.get(url);
        res.render("index", { weather: response.data, error: null });
    } catch (error) {
        res.render("index", { weather: null, error: "Could not fetch weather. Check the city name." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
