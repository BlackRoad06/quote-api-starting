const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


app.get('/api/quotes/random', (req, res, next) => {
    const randomElement = getRandomElement(quotes);
    const randomQuote = randomElement.quote;
    const randomPerson = randomElement.person;

    res.send({
        quote: {
            quote: randomQuote,
            person: randomPerson
        }
    });
});

app.get('/api/quotes', (req, res, next) => {
    const person = req.query.person;
    if (person) {
        const filteredQuotes = quotes.filter(quote => 
            quote.person.toLowerCase() === person.toLowerCase()
        );

        res.send({
            quotes: filteredQuotes
        });
    } else {
        res.send({ quotes: quotes });
    }
});

app.post('/api/quotes', (req,res, next) => {
    const {quote, person} = req.query;
    if (!quote || !person) {
        return res.status(400).send({
            error: 'Both "quote" and "person" fields are required.'
        });
    }
    const objectToAdd = {
        quote,
        person
    }
    quotes.push(objectToAdd);
    res.status(201).send({
        quote: objectToAdd
    })

});





app.listen(PORT, ()=> {
    console.log(`Server listening on PORT: ${PORT}`);
})