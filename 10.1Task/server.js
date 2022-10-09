const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const stripe = require('stripe')('sk_test_51LdZgaGH599OltwtIgcKMuDdw1XERMd0WbeTy0NvVQxVID9Y4VbDxH5MmgUmbyH3RNiTwiMwvSqOKerOkUtC0IW800q8AeEcJn');

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json())

app.use(cors())

app.post('/pay', async (req, res) => {
  const {
    email
  } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 9.99,
    currency: 'aud',
    metadata: {
      integration_check: 'accept_a_payment'
    },
    receipt_email: email,
  });

  res.json({
    'client_secret': paymentIntent['client_secret']
  })
})

app.post('/sub', async (req, res) => {
  const {
    email,
    payment_method
  } = req.body;

  const customer = await stripe.customers.create({
    payment_method: payment_method,
    email: email,
    invoice_settings: {
      default_payment_method: payment_method,
    },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{
      plan: 'price_1LdshcGH599OltwtxCe0i5fj'
    }],
    expand: ['latest_invoice.payment_intent']
  });

  const status = subscription['latest_invoice']['payment_intent']['status']
  const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']

  res.json({
    'client_secret': client_secret,
    'status': status
  });
})


require('dotenv').config();

const sendGrid = require('@sendgrid/mail');

process.env.SENDGRID_API_KEY = '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'


sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (msg) => {
  console.log(1)
  try {
    await sendGrid.send(msg).then((response) => {
      console.log(response[0].statusCode)
      console.log(response[0].headers)
    });
    console.log(msg)
    console.log("Email sent");
  } catch (error) {
    console.log(msg)
    console.log(error);

    if (error.response) {
      console.log(error.response.body);
    }
  }
};

app.post('/welcome', async (req, res) => {
  console.log('welcome')
  sendEmail({
    to: req.body.email,
    from: 'wangshuyu@deakin.edu.au',
    subject: 'Welcome!',
    text: 'Test message from SendGrid',
    html: '<strong>Message sent by sendgrid.</strong>',
  });

  res.send('Thank you for signing up! A welcome email has been sent');

})


app.listen(port, () => console.log(`Dev @ Deakin listening on port ${port}!`))

