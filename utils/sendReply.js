import nodemailer from "nodemailer";

export const sendReply = async ({ email, subject, message, files }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Genoviq Healthcare" <${process.env.EMAIL_CONTACT}>`, 
    to: email,
    subject,
    text: message,
    attachments: [],
  };
  

  if (files && files.length > 0) {
    mailOptions.attachments = files.map((file) => ({
      filename: file.originalname,
      content: file.buffer, // use buffer instead of path
    }));
  }

  await transporter.sendMail(mailOptions);
};
