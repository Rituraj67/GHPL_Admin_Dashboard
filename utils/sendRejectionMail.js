import nodemailer from "nodemailer";

export const sendRejectionMail = async ({email, name, jobTitle, jobId}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Genoviq Healthcare Pvt. Ltd." <${process.env.EMAIL_CAREER}>`,
      to: email,
      subject: `Application Update – ${jobTitle}`,
      html: `
        <p>Dear <b>${name}</b>,</p>
        <p>Thank you for taking the time to apply for the <b>${jobTitle}</b> position with JobID: <strong>${jobId}</strong> at <b>Genoviq Healthcare Pvt. Ltd.</b>.</p>
        <p>After careful consideration, we regret to inform you that you have not been selected for this role.</p>
        <p>We sincerely appreciate your interest and encourage you to apply for future openings that match your profile.</p>
        <br/>
        <p>We wish you all the best in your career.</p>
        <p><b>Genoviq Healthcare Pvt. Ltd.</b></p>
      `,
    });

    console.log(`❌ Rejection email sent to ${email}`);
  } catch (err) {
    console.error("❌ Rejection email error:", err);
    throw err;
  }
};
