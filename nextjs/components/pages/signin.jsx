"use client";

import { ArrowRight } from "lucide-react";

import { Button, Panel } from "@/components/kit/primitives";

import { useWorkspace } from "@/components/workspace/workspace-provider";
export default function PageContent() {
  const { setToast, go } = useWorkspace();
  return (
    <div className="kit-auth">
      <Panel title="Welcome back" subtitle="Sign in to your workspace">
        <div className="kit-logo">C</div>
        <form
          className="kit-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.currentTarget.reset();
            setToast(
              "Demo sign-in validated. No authentication or network request.",
            );
            go("overview");
          }}
        >
          <label className="kit-field">
            Email address
            <input
              className="kit-input"
              type="email"
              required
              autoComplete="off"
              placeholder="you@example.com"
            />
          </label>
          <div className="kit-field">
            <label htmlFor="demo-password">Password</label>
            <input
              id="demo-password"
              aria-describedby="password-note"
              className="kit-input"
              type="password"
              required
              minLength={8}
              autoComplete="off"
              placeholder="At least 8 characters"
            />
            <small id="password-note">
              Use fictional credentials only. Nothing is saved or sent.
            </small>
          </div>
          <Button primary type="submit">
            Sign in to demo
            <ArrowRight />
          </Button>
        </form>
      </Panel>
    </div>
  );
}
