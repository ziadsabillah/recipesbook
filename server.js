const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express(); // Initialize the application


const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


// Connect to database
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connected to Mongodb database successfully');
});


app.listen(port, () => {
    console.log('Server started on port ' + port);
})


