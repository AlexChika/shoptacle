// currently not in use

export default async function handler(req, res) {
  const body = req.body;
  const urlParams = new URLSearchParams(body).toString();

  try {
    const resp = await fetch(
      `${process.env.PAYSTACK_BASE_URL}/transaction/initialize?${urlParams}`,
      {
        port: "443",
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRETE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await resp.json();
    res.json(data);
  } catch (error) {
    res.json({ status: false, msg: "server error, couldn't reach paystack" });
  }
}
