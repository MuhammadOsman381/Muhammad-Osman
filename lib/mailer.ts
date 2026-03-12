import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactNotification({
  name, email, subject, message,
}: {
  name: string; email: string; subject: string; message: string;
}) {
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL || "mosman257@gmail.com",
    subject: `📬 New Message: ${subject || "No subject"} — from ${name}`,
    html: `
      <div style="font-family:monospace;background:#0a0a0f;color:#e2e8f0;padding:32px;border-radius:12px;max-width:600px">
        <h2 style="color:#06b6d4;margin:0 0 24px">New Contact Message</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="color:#64748b;padding:6px 0;width:80px">Name</td><td style="color:#fff">${name}</td></tr>
          <tr><td style="color:#64748b;padding:6px 0">Email</td><td style="color:#06b6d4">${email}</td></tr>
          <tr><td style="color:#64748b;padding:6px 0">Subject</td><td style="color:#fff">${subject || "—"}</td></tr>
        </table>
        <div style="margin-top:24px;padding:16px;background:#111827;border-radius:8px;border-left:3px solid #06b6d4">
          <p style="color:#94a3b8;margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em">Message</p>
          <p style="color:#e2e8f0;margin:0;line-height:1.6">${message}</p>
        </div>
        <p style="margin-top:24px;color:#475569;font-size:12px">Sent via portfolio contact form</p>
      </div>
    `,
  });
}
