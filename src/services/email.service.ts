import { transporter } from '../config/email';

export const sendPasswordResetEmail = async (
  to: string,
  name: string,
  resetUrl: string
): Promise<void> => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Reset your password',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Reset your password</h2>
        <p>Hi ${name},</p>
        <p>We received a request to reset your admin password.
           Click the button below to choose a new one.</p>
        <a href="${resetUrl}"
           style="display:inline-block;padding:12px 24px;
                  background:#1a1a1a;color:#fff;
                  text-decoration:none;border-radius:4px;margin:16px 0;">
          Reset password
        </a>
        <p style="color:#666;font-size:13px;">
          This link expires in ${process.env.RESET_TOKEN_EXPIRES_MINUTES} minutes.
          If you did not request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });
};