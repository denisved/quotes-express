const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.ejs`) 

app.use(express.static('styles'));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), { title });
});

app.get('/quotes', (req, res) => {
    const title = 'Quoutes';
    res.render(createPath('quotes'), { title });
});

app.get('/add-quote', (req, res) => {
    const title = 'Add Quote'
    res.render(createPath('add-quote'), { title });
});


app.get('/edit-quote', (req, res) => {
    const title = 'Edit Quote';
    res.render(createPath('edit-quote'), { title });
});

app.use((req, res) => {
    const title = 'Error';
    res
      .status(404)
      .render(createPath('error'), { title });
});