require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

//Next initialize the application
const app = express();
const port = 3000;

app.use(express.json());

//Start the Server
app.listen(3000, ()=> {
    console.log('Server started on port 3000');
});

const routes = require('./routes/routes');

app.use('/api',routes);