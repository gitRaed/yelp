require("dotenv").config();
const express = require("express");


const app = express();

app.get("/getRestaurants", (req, res) => {

    res.status(200);
    res.json({
        "status" : "success",
        "restaurants" : "mcdonald"
    });
})


const port = process.env.PORT || 9000;
app.listen(port, () => {

    console.log('Server is up on ' + process.env.port);
});