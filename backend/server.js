require("dotenv").config();
const express = require("express");
const db = require('./db');
const morgan = require("morgan");
const app = express();

app.use(express.json());

// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {

    try {
        
        const results = await db.query("SELECT * FROM restaurants");
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }
        });

    } catch (error) {
        
        res.status(500).json({
            status: "failed",
            message: "Get all restaurants, error : " + error 
        });

        console.log("Get all restaurants, error : " + error);
    }
});


//Get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {


    try {
        
        const results = await db.query('Select * from restaurants where id = $1', [req.params.id]);

        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }
        })

    } catch (error) {
        
        res.status(500).json({
            status: 'failed',
            message: 'Get a restaurant, error : ' + error
        });

        console.log('Get a restaurant, error : ' + error);
    }

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