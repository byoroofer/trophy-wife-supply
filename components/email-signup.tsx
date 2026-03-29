"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { trackEmailSignup } from "@/lib/tracking";

type SubmitState = "idle" | "success" | "error";

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState("idle");
    setMessage("");

    try {
      const response = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      let result: { error?: string; message?: string } = {};

      try {
        result = (await response.json()) as { error?: string; message?: string };
      } catch {
        result = {};
      }

      if (!response.ok) {
        throw new Error(result.error || "Subscription failed.");
      }

      trackEmailSignup();
      setEmail("");
      setSubmitState("success");
      setMessage(result.message || "You are on the list.");
    } catch (error) {
      const nextMessage =
        error instanceof Error ? error.message : "Subscription failed.";
      setSubmitState("error");
      setMessage(nextMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <aside className="signup-card" aria-label="Email signup">
      <h2>Join the first look list.</h2>
      <p>
        Capture launch demand early, feed Klaviyo directly, and keep a warm
        audience ready for product drops, restocks, and boutique expansion.
      </p>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <button className="button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving your spot..." : "Join the list"}
        </button>
        <div className="signup-meta">
          <span>Server-routed to Klaviyo using private env vars only.</span>
          <span>Safe to leave inactive until launch credentials are ready.</span>
        </div>
      </form>
      {submitState !== "idle" ? (
        <p
          className={`status ${
            submitState === "success" ? "status-success" : "status-error"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </aside>
  );
}
