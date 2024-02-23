import { Resend } from "resend";

import { AUTH_URI } from "./constants";

const resend = new Resend(process.env.RESEND_API_KEY);
// const resend = {
//   emails: { send: ({}: any) => {} },
// };

const domain = process.env.NEXT_PUBLIC_APP_URL || "loclahost:3000";
const mailFrom = process.env.NEXT_PUBLIC_MAIL_FROM || "mail@example.com";

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: mailFrom,
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}${AUTH_URI.newPassword}?token=${token}`;

  await resend.emails.send({
    from: mailFrom,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}${AUTH_URI.confirmEmail}?token=${token}`;

  await resend.emails.send({
    from: mailFrom,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
