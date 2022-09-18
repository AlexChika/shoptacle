import { addSubDocs } from "../utils/firebase";
export async function payWithPaystack({ email, amount, cart }) {
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
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].quantity < 1) continue;

          const order = {
            name: cart[i].name, // of product
            price: cart[i].price, // price of item
            amount: cart[i].amount, // amount of item
            ref, //ref from payment
            date: new Date().toDateString(),
          };

          // add to db
          await addSubDocs("customers", email, "orders", order);
          alert("Payment complete! Reference: " + ref);
        }
      }

      if (!status) {
        alert("Payment failed! Reference: " + ref);
      }
    },
    onClose: function () {
      alert("Transaction was not completed, window closed.");
    },
  });
  handler.openIframe();
}
