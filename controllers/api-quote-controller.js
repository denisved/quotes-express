const Quote = require('../models/quote');

const handleError = (res, error) => {
    res.status(500).send(error);
}

const getQuotes = (req, res) => {
    Quote
        .find()
        .sort({ createdAt: -1 })
        .then((quotes) => res.status(200).json(quotes))
        .catch((error) => handleError(res, error))
};

const getQuote = (req, res) => {
    const { id } = req.params; 
    Quote
        .findById(id) 
        .then((quote) => res.status(200).json(quote))
        .catch((error) => handleError(res, error));
};

const postQuote = (req, res) => {
    const { text, author } = req.body;
    const quote = new Quote({text, author});
    quote
        .save()
        .then((quote) => res.status(200).json(quote))
        .catch((error) => handleError(res, error));
};

const editQuote = (req, res) => {
    const { text, author } = req.body;
    const { id } = req.params;
    Quote
        .findByIdAndUpdate(id, { text, author })
        .then((quote) => res.status(200).json(quote))
        .catch((error) => handleError(res, error));
};

const deleteQuote = (req, res) => {
    const { id } = req.params; 
    Quote
        .findByIdAndDelete(id) 
        .then(() => res.status(200).json(req.params.id))
        .catch((error) => handleError(res, error));
}

module.exports = {
    getQuotes,
    getQuote,
    postQuote,
    editQuote,
    deleteQuote,
}