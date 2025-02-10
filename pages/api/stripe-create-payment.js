const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);

export default async function handler(req, res) {
  try {
    const amount = req.body.amount;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      status: true,
      msg: "payment successful",
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.json({ status: false, msg: "server error, couldn't reach stripe" });
  }
}
