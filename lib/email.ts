import nodemailer from 'nodemailer';

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = EMAIL_USER && EMAIL_PASS ? nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
}) : null;

export async function sendEmail(opts: { to: string; subject: string; text?: string; html?: string; replyTo?: string }) {
  if (!transporter) {
    // noop in environments without SMTP configured
    // eslint-disable-next-line no-console
    console.log('[email noop] to:', opts.to, 'subject:', opts.subject, 'replyTo:', opts.replyTo);
    return;
  }

  const from = EMAIL_USER || opts.replyTo || 'no-reply@example.com';

  await transporter.sendMail({
    from,
    to: opts.to,
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });
}

export default sendEmail;
