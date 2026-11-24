import { describe, expect, it } from "vitest";
import { bookingHoldsSlot } from "./db";

describe("bookingHoldsSlot", () => {
  it("holds confirmed or paid bookings", () => {
    expect(
      bookingHoldsSlot({ status: "confirmed", paymentStatus: "unpaid", stripeSessionId: null })
    ).toBe(true);
    expect(
      bookingHoldsSlot({ status: "pending", paymentStatus: "paid", stripeSessionId: "cs_1" })
    ).toBe(true);
  });

  it("does not hold cancelled bookings", () => {
    expect(
      bookingHoldsSlot({ status: "cancelled", paymentStatus: "paid", stripeSessionId: "cs_1" })
    ).toBe(false);
  });

  it("does not hold Stripe checkout pending (awaiting payment)", () => {
    expect(
      bookingHoldsSlot({
        status: "pending",
        paymentStatus: "unpaid",
        stripeSessionId: "cs_test_123",
      })
    ).toBe(false);
    expect(
      bookingHoldsSlot({
        status: "pending",
        paymentStatus: "unpaid",
        stripeSessionId: "creating",
      })
    ).toBe(false);
  });

  it("holds legacy pending without Stripe session", () => {
    expect(
      bookingHoldsSlot({ status: "pending", paymentStatus: "unpaid", stripeSessionId: null })
    ).toBe(true);
  });
});
