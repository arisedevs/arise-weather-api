const axios = require("axios");

const getClientIp = (req) => {
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (xForwardedFor) {
        const ipAddresses = xForwardedFor.split(',').map(ip => ip.trim());
        return ipAddresses[0]; // Return the first IP address in the list
    }
    return req.connection.remoteAddress || req.socket.remoteAddress;
};

const getInitialLocation = async(req, res) => {
    try {

        let clientIp = getClientIp(req);


        // If the client IP is a loopback address or not available, use a default IP address
        const isLoopback = clientIp === '::1' || clientIp === '127.0.0.1';
        if (!clientIp || isLoopback) {
            clientIp = ""; // Default IP address
        }

        const response = await axios.get(`http://ip-api.com/json/${clientIp}`);

        // // Extract the client's IP address
        // const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // // Call the IP API with the client's IP address
        // const response = await axios.get(`http://ip-api.com/json/${clientIp}`);

        res.json(response.data);

    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).send("Error in fetching data.");
    }
}


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
    getInitialLocation,
    getSearchLocation,
    getLocation,
    getPhoto,
}