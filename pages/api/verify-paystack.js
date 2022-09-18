export default async function handler(req, res) {
  // get ref from url as url query
  const ref = req.query.ref;

  try {
    const resp = await fetch(
      `https://api.paystack.co/transaction/verify/${ref}`,
      {
        port: "443",
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRETE_KEY}`,
        },
      }
    );
    const { status } = await resp.json();

    if (status) {
      res.json({ status: true, msg: "payment successful" });
    }

    if (!status) {
      res.json({
        status: false,
        msg: "Payment was not completed, please try again",
      });
    }
  } catch (error) {
    res.json({ status: false, msg: "server error, couldn't reach paystack" });
  }
}
