const stripe = require("stripe")(
  "sk_test_51LSLaZARITds5BKwqoKW1PaCzyqc5KPjq1yjEy11gJnAsCyvyMPtcgmhO5tTfojwS1GQ9Nj6Wzp9PzhB4QpuLSAl0070pdKW8k"
);

export default async function handler(req, res) {
  const amount = req.body.amount;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
