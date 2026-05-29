import nodemailer, { type Transporter } from "nodemailer";

let cached: Transporter | null = null;

export function getTransporter(): Transporter | null {
  if (cached) return cached;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn("[mailer] SMTP not configured — emails will be logged only.");
    return null;
  }
  cached = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: String(SMTP_SECURE ?? "false") === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return cached;
}

export async function sendMail(opts: {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) {
  const from = process.env.MAIL_FROM ?? "LUXX Website <no-reply@luxxfl.com>";
  const to = process.env.MAIL_TO ?? "info@luxxfl.com";
  const t = getTransporter();
  if (!t) {
    console.log("[mailer:dry-run]", { from, to, ...opts });
    return { dryRun: true };
  }
  const info = await t.sendMail({ from, to, ...opts });
  return { messageId: info.messageId };
}
