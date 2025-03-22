import nodemailer from "nodemailer";

export const sendApplicationAcknowledgement = async ({ name, email, jobTitle, jobId }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,      // Your Gmail/SMTP user
        pass: process.env.EMAIL_PASS       // Your Gmail/SMTP password or App Password
      }
    });

    const mailOptions = {
      from: `"Genoviq Healthcare Pvt. Ltd." <${process.env.EMAIL_CAREER}>`,
      to: email,
      subject: "Application Received - Genoviq Healthcare Pvt. Ltd.",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
          <h2 style="color: #3b82f6;">Dear ${name},</h2>
          <p>Thank you for applying for the position of <strong>${jobTitle}</strong> with JobID: <strong>${jobId}</strong> at <strong>Genoviq Healthcare Pvt. Ltd.</strong>.</p>
          <p>We have successfully received your application and our recruitment team will review your profile shortly. If your qualifications match our requirements, we will reach out to you for the next steps.</p>
          <p>If you have any questions in the meantime, feel free to reply to this email.</p>
          <br />
          <p>Best regards,<br />
          HR Team<br />
          Genoviq Healthcare Pvt. Ltd.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`📩 Acknowledgment email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send acknowledgment email:", error);
  }
};
