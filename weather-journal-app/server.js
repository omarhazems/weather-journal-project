// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3030;
const server = app.listen(port, listening);

function listening() {
    console.log("server is runing");
    console.log(`running on localhost: ${port}`);
}

app.get('/toApp', function (req, res) {
    res.json(projectData);
});

app.post('/weatherData', function (req, res) {
    let reqData = req.body;
    let newData = {
        temp: reqData.Temp,
        Date: reqData.date,
        Response: reqData.response
    };
    projectData = newData;
    res.json(projectData);
});
