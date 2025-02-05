const express = require('express');
const { getQuotes,
        getQuote,
        getEditQuote,
        getAddQuote,
        postQuote,
        editQuote,
        deleteQuote, 
    } = require('../controllers/quote-controller');

const router = express.Router();

router.get('/quotes', getQuotes);
router.get('/quote/:id', getQuote);
router.get('/edit/:id', getEditQuote);
router.get('/add', getAddQuote);
router.post('/add', postQuote)
router.put('/edit/:id', editQuote)
router.delete('/quote/:id', deleteQuote);

module.exports = router;