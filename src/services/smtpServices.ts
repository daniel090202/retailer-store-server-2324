import nodemailer from 'nodemailer';

const sendMail = async ({
  to,
  name,
  subject,
  content,
}: {
  to: string;
  name: string;
  subject: string;
  content: string;
}) => {
  const { SMTP_HOST, SMTP_PASSWORD } = process.env;
};

export { sendMail };
