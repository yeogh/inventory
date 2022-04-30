const express = require('express');
const cors = require('cors');
const app = express();
const pool = require("./db")

//MIDDLEWARE

app.use(cors());
app.use(express.json()); //req.body


//ROUTES

//Register and login routes
const users = require('./controllers/users');
app.use("/auth", users)


//Product routes
const productsRouter = require('./controllers/products');
app.use("/products", productsRouter);




//CONNECTION
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)


})