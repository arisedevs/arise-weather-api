const axios = require("axios");



const getSearchLocation = async(req, res) => {

    const { q } = req.query;
    const hereApiKey = process.env.HERE_API_KEY;
    try {
        const response = await axios.get("https://autocomplete.search.hereapi.com/v1/autocomplete", {
            params: {
                q: q,
                apiKey: hereApiKey,
            },
        })

        res.json(response.data);
    } catch(error) {
        console.error("Error fetching data:", error.message);
        res.status(500).send("Error in fetching data.");
    }
}

const getLocation = async(req, res) => {

    const { q } = req.query;
    const hereApiKey = process.env.HERE_API_KEY;

    if (!q) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    try {
        const response = await axios.get("https://geocode.search.hereapi.com/v1/geocode", {
            params: {
                q: q,
                apiKey: hereApiKey,
            }
        });

        res.json(response.data)
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const getPhoto  = async (req, res) => {
    const { photoReference } = req.query;
    const googleApiKey = process.env.GOOGLE_API_KEY
    try {
        const response = await axios.get("https://maps.googleapis.com/maps/api/place/photo", {
            params: {
                photo_reference: photoReference,
                maxwidth: 300,
                key: googleApiKey
            }
        })
        res.json(response);

    } catch(error) {
        res.status(500).send("Error in fetching data.");
    }
}

module.exports = {
    getSearchLocation,
    getLocation,
    getPhoto,
}