import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database and notification functions
vi.mock("./db", () => ({
  createContactSubmission: vi.fn().mockResolvedValue({ insertId: 1 }),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  it("successfully submits a contact form with valid data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "John Doe",
      email: "john@example.com",
      phone: "(123) 456-7890",
      serviceType: "catering",
      message: "I would like to book catering for my event next month.",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("Thank you");
  });

  it("rejects submission with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "Jane Doe",
        email: "invalid-email",
        phone: "(123) 456-7890",
        serviceType: "meal-prep",
        message: "I am interested in meal prep services.",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with short name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "J",
        email: "jane@example.com",
        phone: "(123) 456-7890",
        serviceType: "inquiry",
        message: "I have a question about your services.",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with short message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "Jane Doe",
        email: "jane@example.com",
        phone: "(123) 456-7890",
        serviceType: "inquiry",
        message: "Short",
      })
    ).rejects.toThrow();
  });

  it("accepts optional phone number", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Jane Doe",
      email: "jane@example.com",
      serviceType: "family-meals",
      message: "I would like to book family meals for a special occasion.",
    });

    expect(result.success).toBe(true);
  });

  it("validates service type enum", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "John Doe",
        email: "john@example.com",
        phone: "(123) 456-7890",
        serviceType: "invalid-service" as any,
        message: "This should fail validation.",
      })
    ).rejects.toThrow();
  });
});
