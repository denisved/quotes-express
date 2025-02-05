const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const quouteRoutes = require('./routes/quote-routes')
const createPath = require('./helpers/create-path');
const qouteApiRoutes = require('./routes/api-quote-routes')
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

const PORT = process.env.PORT;
const DB = process.env.MONGO_URL;

mongoose
    .connect(DB)
    .then(() => {console.log('connected to DB')})
    .catch((err) => {console.log(err)});

app.use(express.static('styles'));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.get('/', (req, res) => {
    res.render(createPath('index'));
});

app.use(quouteRoutes);
app.use(qouteApiRoutes);

app.use((req, res) => {
    res
      .status(404)
      .render(createPath('error'));
});