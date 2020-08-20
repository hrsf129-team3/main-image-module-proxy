const axios = require('axios');
const express = require('express');
const app = express();
const PORT = 3717;
const path = require('path');

//middleware
app.use('/products/:id', express.json());
app.use('/products/:id', express.static(path.join(__dirname, './client')))

//routes

//get request is coming from bundle.js
//main image module
app.get('/product1info', function (req, res, next) {
  console.log("hitting server.js proxy")
  axios.get('http://localhost:3007/product1info')
    .then((results) => {
      console.log("results", results.data);
      res.send(results.data)})
    .catch((err) => {console.log(err)});
});

//review module
app.get('/reviews', function(req, res) {
  axios.get('http://localhost:3000/reviews')
    .then((results) => {
      console.log("results", results.data);
      res.send(results.data)})
    .catch((err) => {console.log(err)});
});

app.get('/newest', function(req, res) {
  axios.get('http://localhost:3000/newest')
    .then((results) => {
      console.log("results", results.data);
      res.send(results.data)})
    .catch((err) => {console.log(err)});
});

// recommended products
app.get('/data/:id', (req, res) => {
  var id = req.params.id;
  axios.get(`http://localhost:4000/data/${id}`)
    .then((results) => {
      console.log("results", results.data)
      res.send(results.data)})
    .catch((err) => {console.log(err)});
});

//start server
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully listening on port:', PORT);
  }
})