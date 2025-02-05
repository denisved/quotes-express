const Quote = require('../models/quote');
const createPath = require('../helpers/create-path');

const handleError = (res, error) => {
    console.log(error);
    res.render(createPath('error'))
}

const getQuotes = (req, res) => {
    Quote
        .find()
        .sort({ createdAt: -1 })
        .then((quotes) => res.render(createPath('quotes'), {quotes}))
        .catch((error) => handleError(res, error))
};

const getQuote = (req, res) => {
    const { id } = req.params; 
    Quote
        .findById(id) 
        .then((quote) => { 
            res.render(createPath('quote'), { quote }); })
            .catch((error) => handleError(res, error));
};

const getEditQuote = (req, res) => {
    const { id } = req.params; 
    Quote
        .findById(id) 
        .then((quote) => { 
            res.render(createPath('edit-quote'), { quote }); })
            .catch((error) => handleError(res, error));
}

const getAddQuote = (req, res) => {
    res.render(createPath('add-quote'));
}
const postQuote = (req, res) => {
    const { text, author } = req.body;
    const quote = new Quote({text, author});
    quote
        .save()
        .then((quote) => res.redirect('/quotes'))
        .catch((error) => handleError(res, error));
};

const editQuote = (req, res) => {
    const { text, author } = req.body;
    const { id } = req.params;
    Quote
        .findByIdAndUpdate(id, { text, author })
        .then(post => res.redirect(`/quotes`))
        .catch((error) => handleError(res, error));
};

const deleteQuote = (req, res) => {
    const { id } = req.params; 
    Quote
        .findByIdAndDelete(id) 
        .then((quote) => { res.sendStatus(200); })
        .catch((error) => handleError(res, error));
}

module.exports = {
    getQuotes,
    getQuote,
    getEditQuote,
    getAddQuote,
    postQuote,
    editQuote,
    deleteQuote,
}