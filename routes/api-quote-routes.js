const express = require('express');
const { getQuotes,
        getQuote,
        postQuote,
        editQuote,
        deleteQuote, 
    } = require('../controllers/api-quote-controller');

const router = express.Router();

router.get('/api/quotes', getQuotes);
router.get('/api/quote/:id', getQuote);
router.post('/api/add', postQuote)
router.put('/api/edit/:id', editQuote)
router.delete('/api/quote/:id', deleteQuote);

module.exports = router;