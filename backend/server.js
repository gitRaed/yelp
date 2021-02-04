import express from "express";


const app = express();
const port = 3005;

app.listen(port, () => {

    console.log('Server is up');
})