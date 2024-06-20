const express = require("express");
const env = require("dotenv");
const searchPlaceRoutes = require("./routes/searchPlaceRoutes")
const getWeatherRoutes = require("./routes/getWeatherRoutes")
env.config();

const app = express();

app.use(express.json());

app.use("/api", searchPlaceRoutes);
app.use("/api", getWeatherRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})

module.exports = app;