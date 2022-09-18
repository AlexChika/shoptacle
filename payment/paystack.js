export async function payWithPaystack({ email, amount, cart, Logger }) {
  const handler = PaystackPop.setup({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    email,
    amount,
    currency: "NGN",
    ref: new Date().getTime().toString(),

    callback: async function (response) {
      const ref = response.reference;
      const resp = await fetch(`/api/verify-paystack?ref=${ref}`);
      const { status } = await resp.json();

      if (status) {
        window.location.href =
          "http://" +
          window.location.host +
          `/profile/confirmation?redirect_status=succeeded&payment_intent=${ref}`;
      }

      if (!status) {
        window.location.href =
          "http://" +
          window.location.host +
          `/profile/confirmation?redirect_status=failed&payment_intent=${ref}`;
      }
    },
    onClose: function () {
      Logger("Transaction was not completed, window closed.", "error");
    },
  });
  handler.openIframe();
}
