"use client";

import { FormEvent, useEffect, useState } from "react";
import { brand } from "@/config/brand";
import { contact } from "@/data/content";
import { cn } from "@/lib/utils";

type Role = (typeof contact.roles)[number];

const empty = {
  name: "",
  organization: "",
  email: "",
  role: "" as Role | "",
  message: "",
};

export function InquiryForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof empty, string>>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const role = new URLSearchParams(window.location.search).get("role");
    if (!role || !contact.roles.includes(role as Role)) return;
    const frame = requestAnimationFrame(() => {
      setValues((current) => ({ ...current, role: role as Role }));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  function update(key: keyof typeof empty, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setReady(false);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next: Partial<Record<keyof typeof empty, string>> = {};
    if (!values.name.trim()) next.name = "Add your name.";
    if (!values.organization.trim()) next.organization = "Add your organization.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email.";
    if (!values.role) next.role = "Choose a role.";
    if (values.message.trim().length < 12) next.message = "Add a short note.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = `${brand.name} — ${values.role}`;
    const body = `Name: ${values.name}\nOrganization: ${values.organization}\nEmail: ${values.email}\nRole: ${values.role}\n\n${values.message}`;
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setReady(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <fieldset>
        <legend className="text-[12px] tracking-[0.16em] text-silver uppercase">Role</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {contact.roles.map((role) => {
            const selected = values.role === role;
            return (
              <button
                key={role}
                type="button"
                onClick={() => update("role", role)}
                className={cn(
                  "h-10 rounded-full border px-4 text-[12px] tracking-[0.08em]",
                  selected
                    ? "border-porcelain bg-porcelain text-ink"
                    : "border-white/15 text-porcelain",
                )}
                aria-pressed={selected}
              >
                {role}
              </button>
            );
          })}
        </div>
        {errors.role ? <p className="mt-2 text-sm text-ice">{errors.role}</p> : null}
      </fieldset>

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Name"
          value={values.name}
          error={errors.name}
          onChange={(value) => update("name", value)}
          autoComplete="name"
        />
        <Field
          label="Organization"
          value={values.organization}
          error={errors.organization}
          onChange={(value) => update("organization", value)}
          autoComplete="organization"
        />
      </div>
      <Field
        label="Email"
        type="email"
        value={values.email}
        error={errors.email}
        onChange={(value) => update("email", value)}
        autoComplete="email"
      />
      <label className="block">
        <span className="text-[12px] tracking-[0.16em] text-silver uppercase">Message</span>
        <textarea
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          rows={5}
          className="mt-2 w-full resize-y border border-white/15 bg-transparent px-4 py-3 text-sm outline-none"
        />
        {errors.message ? <p className="mt-2 text-sm text-ice">{errors.message}</p> : null}
      </label>
      <button
        type="submit"
        className="inline-flex h-12 items-center rounded-full bg-porcelain px-6 text-[13px] tracking-[0.08em] text-ink"
      >
        {brand.cta.conversation}
      </button>
      <p className="text-sm leading-6 text-silver" aria-live="polite">
        {ready
          ? `Your note is ready in your email app, addressed to ${brand.email}.`
          : `Messages are sent through your own email to ${brand.email}.`}
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  const id = label.toLowerCase();
  return (
    <label className="block" htmlFor={id}>
      <span className="text-[12px] tracking-[0.16em] text-silver uppercase">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full border border-white/15 bg-transparent px-4 text-sm outline-none"
      />
      {error ? <p className="mt-2 text-sm text-ice">{error}</p> : null}
    </label>
  );
}
