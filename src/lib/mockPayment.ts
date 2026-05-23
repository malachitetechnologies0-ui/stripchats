import { tokenPackages } from "@/data/tokenPackages";
import type { PaymentStatus } from "@/types";

export type PaymentMethod = "card" | "upi" | "netbanking" | "wallet" | "paypal";

export interface MockPaymentResult {
  status: PaymentStatus;
  packageId: string;
  tokens: number;
  method: PaymentMethod;
  message: string;
}

export function handleMockPayment(
  packageId: string,
  paymentMethod: PaymentMethod,
  forcedStatus: PaymentStatus = "success"
): MockPaymentResult {
  const selectedPackage = tokenPackages.find((item) => item.id === packageId) ?? tokenPackages[0];
  return {
    status: forcedStatus,
    packageId,
    tokens: selectedPackage.tokens,
    method: paymentMethod,
    message:
      forcedStatus === "success"
        ? "Mock payment approved. Tokens can be credited locally."
        : forcedStatus === "pending"
          ? "Mock payment is pending verification."
          : "Mock payment failed. Wallet balance remains unchanged."
  };
}

export function simulatePaymentSuccess(packageId = "tokens-250", method: PaymentMethod = "card") {
  return handleMockPayment(packageId, method, "success");
}

export function simulatePaymentFailure(packageId = "tokens-250", method: PaymentMethod = "card") {
  return handleMockPayment(packageId, method, "failed");
}

export function simulatePaymentPending(packageId = "tokens-250", method: PaymentMethod = "card") {
  return handleMockPayment(packageId, method, "pending");
}

/*
  Production gateway integration notes:
  - Razorpay: create an order on a backend, return order_id to the client, verify signature server-side.
  - Stripe: create a PaymentIntent on a backend, confirm on the client, fulfill only after webhook success.
  - PayPal: create/capture orders server-side and reconcile with webhook events.
  - Webhooks must verify signatures, write immutable ledger rows, handle idempotency keys, and prevent double-crediting.
  - Refund handling should create adjustment transactions instead of mutating the original ledger entry.
*/
