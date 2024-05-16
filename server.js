const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8081;

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server

app.get("/weather", (req, res) => {
  res.status(200).send(projectData);
});

app.post("/update-weather", (req, res) => {
  projectData = { ...req.body };
  res.status(201).send({ success: true });
});

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
