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

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connected to Mongodb database successfully');
});

// Configure app to use routes

const authRoute = require('./routes/auth');
const recipesRoute = require('./routes/recipes');

// Route middleware 
app.use('/api/user', authRoute);
app.use('/recipes', recipesRoute);


app.listen(port, () => {
    console.log('Server started on port ' + port);
})


