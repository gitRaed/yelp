require("dotenv").config();
const express = require("express");
const db = require('./db');
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(express.json());

// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {

    try {
        
        //const results = await db.query("SELECT * FROM restaurants");
        const restaurantsRatingData = await db.query('select * from restaurants left join(select restaurant_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;');
        
        res.status(200).json({
            status: "success",
            results: restaurantsRatingData.rows.length,
            data: {
                restaurants: restaurantsRatingData.rows
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
        
        //? get data from a restaurant
        const restaurant = await db.query('select * from restaurants left join(select restaurant_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1', [req.params.id]);

        //? get the reviews for that restaurant
        const reviews = await db.query('Select * from reviews where restaurant_id = $1', [req.params.id]);

        res.status(200).json({
            status: 'success',
            data: {
                restaurants: restaurant.rows[0],
                reviews: reviews.rows
            },
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
app.post("/api/v1/restaurants", async (req, res) => {

    try {
        
        const {name, location, price_range} = req.body;
        const results = await db.query("INSERT INTO restaurants(name, location, price_range) VALUES ($1, $2, $3) returning*", 
        [name, location, price_range] );

        res.status(200).json({
            status: 'success',
            message: 'Restaurants ' + name + ' created successfully',
            data: {
                restaurants: results.rows[0]
            }
        });

    } catch (error) {
        
        res.status(500).json({
            status: 'failed',
            message: 'Create restaurants, error + ' + error
        });

        console.log('Create restaurant, error : ' + error);
    }
});


//Update restaurants 
app.put("/api/v1/restaurants/:id", async (req, res) => {

    try {
        
        const {name, location, price_range} = req.body;
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4returning *",
        [name, location, price_range, req.params.id]);

        res.status(200).json({
            status: 'success',
            message: 'Restaurants ' + name + ' updated successfully',
            data: {
                restaurants: results.rows[0]
            }
        });

    } catch (error) {
        
        res.status(500).json({
            status: 'failed',
            message: 'Update restaurants, error + ' + error
        });

        console.log('Update restaurant, error : ' + error);
    }
});

//Delete restaurants
app.delete("/api/v1/restaurants/:id", async (req, res) => {

    try {
        
        await db.query("DELETE FROM restaurants WHERE id= $1", [req.params.id]);

        res.status(200).json({
            status: 'success',
            message: 'Restaurant deleted successfully'
        });

    } catch (error) {
        
        res.status(500).json({
            status: 'failed',
            message: 'Delete restaurants, error + ' + error
        });

        console.log('Delete restaurant, error : ' + error);
    }
});


app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {

    try {
        
        const {id} = req.params;
        const {name, review, rating} = req.body;

        const newReview = await db.query('INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *', [
            id, name, review, rating ]);

        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0],
            },
        })
        
    } catch (error) {
        console.log('Add review error : ' + error);
    }
});

const port = process.env.PORT || 9000;
app.listen(port);
console.log(port);