"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { buttonClass } from "@/components/ui";

const fieldClass =
  "w-full rounded-sm border border-gold/25 bg-ink px-3.5 py-3 text-[0.94rem] text-sand transition-colors focus:border-gold focus:outline-none";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    setLoading(true);
    setError(null);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Wrong username or password — اسم المستخدم أو كلمة السر غلط");
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} dir="ltr">
      <div className="mb-5">
        <label htmlFor="username" className="mb-2 block text-[0.8rem] text-gold-soft">
          Username
        </label>
        <input
          id="username"
          name="username"
          required
          autoComplete="username"
          className={fieldClass}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="mb-2 block text-[0.8rem] text-gold-soft">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={fieldClass}
        />
      </div>

      <button type="submit" disabled={loading} className={buttonClass("primary", "w-full")}>
        {loading ? "Signing in…" : "Sign in"}
      </button>

      {error ? <p className="mt-4 text-[0.85rem] text-[#e2857f]">{error}</p> : null}
    </form>
  );
}
