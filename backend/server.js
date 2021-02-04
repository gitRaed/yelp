require("dotenv").config();
const express = require("express");


const app = express();


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


const port = process.env.PORT || 9000;
app.listen(port);