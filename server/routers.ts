import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createContactSubmission } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Contact form submission endpoint
  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(2, "Name must be at least 2 characters"),
          email: z.string().email("Invalid email address"),
          phone: z.string().optional(),
          serviceType: z.enum(["inquiry", "meal-prep", "catering", "family-meals"]),
          message: z.string().min(10, "Message must be at least 10 characters"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Save to database
          await createContactSubmission({
            name: input.name,
            email: input.email,
            phone: input.phone || null,
            serviceType: input.serviceType,
            message: input.message,
          });

          // Send notification to owner
          const serviceTypeLabel = {
            inquiry: "General Inquiry",
            "meal-prep": "Meal Prep",
            catering: "Catering",
            "family-meals": "Family Meals",
          }[input.serviceType];

          await notifyOwner({
            title: `New ${serviceTypeLabel} Request from ${input.name}`,
            content: `
Email: ${input.email}
Phone: ${input.phone || "Not provided"}
Service Type: ${serviceTypeLabel}

Message:
${input.message}
            `,
          });

          return {
            success: true,
            message: "Thank you for your inquiry. We will be in touch soon!",
          };
        } catch (error) {
          console.error("Error submitting contact form:", error);
          throw new Error("Failed to submit contact form");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
