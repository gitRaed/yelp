require("dotenv").config();
const express = require("express");


const app = express();
const port = process.env.PORT || 9000;

app.listen(port, () => {

    console.log('Server is up on ' + process.env.port);
});