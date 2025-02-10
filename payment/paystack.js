import { useEffect, useCallback } from "react";

export function usePaystack() {
  const Paystack = useCallback(function () {
    this.hasLoaded = function () {
      if (this.payWithPaystack) return true;
      return false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof document === "undefined") return;
    async function LoadPayStack() {
      const { default: _Paystack } = await import("@paystack/inline-js");
      const popup = new _Paystack();

      function payWithPaystack({ email, amount, Logger }) {
        popup.checkout({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
          email,
          amount,
          currency: "NGN",
          ref: new Date().getTime().toString(),
          onCancel: function (response) {
            console.log(response, "cancelled");
          },
          onSuccess: function (response) {
            console.log(response, "success");
          },
          onError: function (response) {
            console.log({ response }, "error");
            Logger("There was an error", "error");
          },
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
      }

      // add methods to Paystack prototype
      Paystack.prototype.payWithPaystack = payWithPaystack;
    }

    LoadPayStack();
  }, [Paystack]);

  return {
    Paystack,
  };
}

export async function initializePaystack({ email, amount }) {
  const resp = await fetch("/api/initialize-paystack", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, amount }),
  });

  return await resp.json();
}
