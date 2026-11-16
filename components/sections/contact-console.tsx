"use client"

import { useState } from "react"
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin, MessageCircle, type LucideIcon } from "lucide-react"
import { CONTACT, mailtoUrl, whatsappUrl } from "@/lib/contact"
import { HudCard } from "../hud/hud-card"
import { Reveal } from "../ui/reveal"
import { SectionHeader } from "../ui/section-header"

interface Channel {
  id: string
  label: string
  detail: string
  hint: string
  href: string
  icon: LucideIcon
  newTab: boolean
  tone: "primary" | "accent"
}

const CHANNELS: Channel[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    detail: CONTACT.phoneDisplay,
    hint: "Abre un chat directo con el mensaje listo",
    href: whatsappUrl(),
    icon: MessageCircle,
    newTab: true,
    tone: "primary",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    detail: "in/marioperezdev",
    hint: "Abre mi perfil profesional",
    href: CONTACT.linkedin,
    icon: Linkedin,
    newTab: true,
    tone: "accent",
  },
  {
    id: "email",
    label: "Email",
    detail: CONTACT.email,
    hint: "Abre tu correo con el asunto listo",
    href: mailtoUrl(),
    icon: Mail,
    newTab: false,
    tone: "primary",
  },
]

const TONE_CLASSES: Record<Channel["tone"], string> = {
  primary: "border-primary/35 hover:border-primary hover:shadow-[0_0_25px_rgba(0,255,102,0.2)] [--tone:#00FF66]",
  accent: "border-accent/35 hover:border-accent hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] [--tone:#00E5FF]",
}

const FIELD_CLASSES =
  "w-full rounded border border-primary/30 bg-[#070b13] px-3 py-2.5 font-mono text-sm text-slate-100 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-primary/40"

const SEND_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded border px-4 py-2.5 font-mono text-sm uppercase tracking-wider transition-colors duration-200"

export function ContactConsole() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [copied, setCopied] = useState(false)

  const trimmedName = name.trim()
  const trimmedMessage = message.trim()
  const hasDraft = trimmedName.length > 0 || trimmedMessage.length > 0
  const greeting = trimmedName ? `Hola Mario, soy ${trimmedName}.` : "Hola Mario,"
  const draft = `${greeting} ${trimmedMessage || "vi tu portafolio y me gustaría conversar contigo."}`

  const whatsappHref = hasDraft ? whatsappUrl(draft) : whatsappUrl()
  const emailHref = hasDraft
    ? mailtoUrl({
        subject: trimmedName ? `Contacto desde tu portafolio — ${trimmedName}` : undefined,
        body: draft,
      })
    : mailtoUrl()

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-20 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeader index="05" kicker="Canales directos" title="Contacto" suffix=".comm" />

        <Reveal className="mb-8 max-w-2xl">
          <p className="font-mono text-sm leading-relaxed text-slate-300 sm:text-base">
            Disponible para roles de <span className="font-semibold text-white">backend (Java 21 / Spring Boot)</span>,
            IA aplicada y proyectos de ciberseguridad. Elige el canal que prefieras.
          </p>
        </Reveal>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {CHANNELS.map((channel, index) => {
            const Icon = channel.icon
            return (
              <li key={channel.id}>
                <Reveal delay={index * 0.1} className="h-full">
                  <a
                    href={channel.href}
                    {...(channel.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`group flex h-full flex-col gap-4 rounded-sm border bg-[#0d1322]/90 p-5 font-mono transition-all duration-300 hover:-translate-y-1 ${TONE_CLASSES[channel.tone]}`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="h-7 w-7 text-[var(--tone)]" aria-hidden="true" />
                      <ArrowUpRight
                        className="h-5 w-5 text-slate-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--tone)]"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-lg font-bold text-white">{channel.label}</span>
                      <span className="break-all text-sm text-[var(--tone)]">{channel.detail}</span>
                    </div>
                    <span className="text-xs leading-relaxed text-slate-400">{channel.hint}</span>
                    {channel.newTab && <span className="sr-only">(se abre en una pestaña nueva)</span>}
                  </a>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <HudCard accentColor="cyan" className="lg:col-span-7" headerTitle="Redacta tu mensaje">
            <div className="flex flex-col gap-4 font-mono">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-xs uppercase tracking-wider text-slate-300">
                  Nombre o empresa
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Ej. Laura, Tech Lead en Acme"
                  className={FIELD_CLASSES}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-xs uppercase tracking-wider text-slate-300">
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Cuéntame sobre la vacante, el proyecto o la colaboración..."
                  className={`${FIELD_CLASSES} resize-none`}
                />
              </div>

              <p className="text-xs leading-relaxed text-slate-400">
                Tu mensaje se abre ya escrito en WhatsApp o en tu cliente de correo; solo tienes que enviarlo.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${SEND_CLASSES} border-primary bg-primary font-bold text-background hover:bg-primary/85`}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Enviar por WhatsApp</span>
                  <span className="sr-only">(se abre en una pestaña nueva)</span>
                </a>
                <a
                  href={emailHref}
                  className={`${SEND_CLASSES} border-accent/50 bg-accent/10 text-accent hover:bg-accent hover:text-background`}
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>Enviar por email</span>
                </a>
              </div>
            </div>
          </HudCard>

          <HudCard className="lg:col-span-5" headerTitle="Más enlaces">
            <div className="flex flex-col gap-4 font-mono text-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded border border-primary/20 bg-slate-900/60 p-3">
                <span className="break-all text-slate-200">{CONTACT.email}</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 rounded border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs uppercase tracking-wider text-primary transition-colors hover:bg-primary/20"
                >
                  {copied ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span aria-live="polite">{copied ? "Copiado" : "Copiar email"}</span>
                </button>
              </div>

              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded border border-primary/20 bg-slate-900/60 p-3 text-slate-200 transition-colors hover:border-primary hover:text-primary"
              >
                <Github className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>github.com/MarioPerezHamm</span>
                <ArrowUpRight className="ml-auto h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(se abre en una pestaña nueva)</span>
              </a>

              <p className="flex items-center gap-2 border-t border-primary/10 pt-4 text-xs text-slate-400">
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>{CONTACT.location}</span>
              </p>
            </div>
          </HudCard>
        </div>

        <footer className="mt-20 border-t border-primary/20 pt-8 text-center font-mono text-xs leading-relaxed text-slate-400">
          <p>Mario Fernando Pérez Martínez © 2026</p>
          <p>Ingeniero Electrónico · Backend Developer</p>
        </footer>
      </div>
    </section>
  )
}
