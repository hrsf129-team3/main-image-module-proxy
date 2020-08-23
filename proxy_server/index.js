const axios = require('axios');
const express = require('express');
const app = express();
const PORT = 4017;
const path = require('path');

//middleware
app.use('/products/:id', express.json());
app.use('/products/:id', express.static(path.join(__dirname, '../client')));

// routes
app.get('/data/:id', (req, res) => {
  let id = req.params.id;
  axios.get(`http://18.144.176.174:4000/data/${id}`)
    .then((data) => {
      console.log('success')
      res.send(data.data);
    })
    .catch(console.log)
});
app.get('/reviews', (req, res) => {
  axios.get('http://54.67.74.229:3000/reviews')
    .then((data) => {
      res.send(data.data);
    })
    .catch(console.log)
})

app.get('/newest', (req, res) => {
  axios.get('http://54.67.74.229:3000/newest')
    .then((data) => {
      res.send(data.data);
    })
    .catch(console.log)
})


app.get('/images/:id', function (req, res, next) {
  var productID = req.params.id;
  axios.get(`http://54.151.63.254:3007/images/${productID}`)
    .then((data) => {
      res.send(data.data);
    })
    .catch(console.log)
})

// app.get('/product1info', (req, res) => {
//   axios.get('http://54.151.63.254:3007/product1info')
//     .then((data) => {
//       res.send(data.data);
//     })
//     .catch(console.log)
// })

//start server
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully listening on port:', PORT);
  }
})