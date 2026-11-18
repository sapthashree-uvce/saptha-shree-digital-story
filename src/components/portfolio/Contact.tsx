import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Check, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";

import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { sendContactMessage } from "@/lib/contact.functions";
import { PROFILE } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "./BrandIcon";
import { Reveal } from "./Reveal";

const CHANNELS = [
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}`, Icon: Mail, external: false },
  { label: "GitHub", value: PROFILE.githubUser, href: PROFILE.github, Icon: GithubIcon, external: true },
  { label: "LinkedIn", value: "Saptha Shree", href: PROFILE.linkedin, Icon: LinkedinIcon, external: true },
];

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block text-muted-foreground">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-input bg-background px-4 py-3.5 text-base text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/15";

export function Contact() {
  const send = useServerFn(sendContactMessage);
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const result = await send({ data: values });
      if (result.ok) {
        setSent(true);
        reset();
        toast.success("Message sent — thank you! I'll get back to you soon.");
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("Something went wrong. Please try again or email me directly.");
    }
  });

  return (
    <section id="contact" className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="grain relative mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] bg-ink px-5 py-20 text-ink-foreground sm:px-10 sm:py-28 lg:px-16">
        <span aria-hidden="true" className="absolute -right-24 -top-24 size-80 animate-spin-slow rounded-full border border-dashed border-ink-foreground/15" />

        <Reveal>
          <p className="eyebrow mb-6 flex items-center gap-3 text-ink-muted">
            <span className="text-primary">07</span>
            <span className="h-px w-10 bg-ink-foreground/25" /> Contact
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display display-huge max-w-5xl">
            Let's create something <span className="serif-accent text-primary">meaningful.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="max-w-md text-lg leading-relaxed text-ink-foreground/75">
                I'm always interested in learning, collaborating, exploring new opportunities and connecting with
                people who enjoy building innovative solutions.
              </p>
            </Reveal>
            <ul className="mt-10 border-t border-ink-line">
              {CHANNELS.map(({ label, value, href, Icon, external }, i) => (
                <Reveal as="li" key={label} delay={i * 80}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b border-ink-line py-5"
                  >
                    <span className="grid size-11 place-items-center rounded-full border border-ink-line transition-colors duration-300 group-hover:border-primary group-hover:bg-primary">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="eyebrow block text-ink-muted">{label}</span>
                      <span className="block truncate text-lg font-medium transition-colors group-hover:text-primary">
                        {value}
                      </span>
                    </span>
                    <ArrowUpRight className="size-5 text-ink-muted transition-all duration-500 group-hover:rotate-45 group-hover:text-primary" />
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-3xl bg-card p-6 text-card-foreground shadow-float sm:p-10"
              aria-label="Contact form"
            >
              <div className="mb-8 flex items-center justify-between">
                <p className="serif-accent text-3xl">Say hello</p>
                <span className="size-2.5 animate-pulse-dot rounded-full bg-primary" />
              </div>
              <div className="grid gap-5">
                <Field id="name" label="Name" error={errors.name?.message}>
                  <input
                    id="name"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={cn(inputClass, errors.name && "border-destructive")}
                    {...register("name")}
                  />
                </Field>
                <Field id="email" label="Email" error={errors.email?.message}>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={cn(inputClass, errors.email && "border-destructive")}
                    {...register("email")}
                  />
                </Field>
                <Field id="message" label="Message" error={errors.message?.message}>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell me about your idea, project or opportunity…"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={cn(inputClass, "resize-none", errors.message && "border-destructive")}
                    {...register("message", { onChange: () => setSent(false) })}
                  />
                </Field>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group mt-8 inline-flex h-14 w-full items-center justify-between rounded-full bg-primary pl-7 pr-2 font-semibold text-primary-foreground shadow-orange transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending…" : sent ? "Message sent" : "Send Message"}
                <span className="grid size-10 place-items-center rounded-full bg-ink text-ink-foreground transition-transform duration-500 group-hover:rotate-45">
                  {isSubmitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : sent ? (
                    <Check className="size-4" />
                  ) : (
                    <ArrowUpRight className="size-4" />
                  )}
                </span>
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
