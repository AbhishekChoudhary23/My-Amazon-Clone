const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const express = require('express');

const cors = require('cors');
const stripe = require('stripe')("sk_test_51NVG0ESEKTbcaJaR3guX1J78yrPIej7jZKftUoi7ZO2p6AMp4EMXpgoSfnQvYDA5Hd25bcWrcEWv62VgGaJ73ajc00rOKbAPto");

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async(request,response) => {
    const total = request.query.total;

    console.log('Payment Request Recieved. for this ammount', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

exports.api = functions.https.onRequest(app)


// http://127.0.0.1:5001/clone-d7381/us-central1/api