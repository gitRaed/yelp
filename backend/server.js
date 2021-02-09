require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());

// get all restaurants
app.get("/api/v1/restaurants", (req, res) => {

    res.status(200);
    res.json({
        status : "success",
        data : {
            restaurant : ["mcdonald", "wendys", "ribs"]
        } 
    });
});


//Get a restaurant
app.get("/api/v1/restaurants/:id", (req, res) => {

    console.log(req.params);
});


//Create a restaurant
app.post("/api/v1/restaurants", (req, res) => {

    console.log(req.body);
});


//Update restaurants 
app.put("/api/v1/restaurants/:id", (req, res) => {

    console.log(req.params.id);
    console.log(req.body);
});

//Delete restaurants
app.delete("/api/v1/restaurants/:id", (req, res) => {

    res.status(204).json({
        status : "success"
    });
});


const port = process.env.PORT || 9000;
app.listen(port);