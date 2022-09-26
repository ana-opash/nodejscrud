// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Imports routes 
const product = require('./routes/product.route');

// initialize our express app
const app = express();
let port = process.env.PORT || 1234;

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://ana_opash:ana_opash@cluster0.ytiubnl.mongodb.net/?retryWrites=true&w=majority'
let mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB)
    .then(() => {
        console.log("Connected to MongoDB Successfully.");
    })
    .catch((err) => {
        console.log("Could not connect to MongoDB");
        console.log("err");
    });
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/products', product);

// create our dedicating a port and telling our express app

app.listen(port, () => {
    console.log('Server is up and running on port number' + port);
});
