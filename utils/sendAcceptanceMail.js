import nodemailer from "nodemailer";

export const sendAcceptanceMail = async ({ email, name, jobTitle, jobId }) => {
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
      subject: `🎉 Congratulations – ${jobTitle} (Job ID: ${jobId})`,
      html: `
        <p>Dear <b>${name}</b>,</p>
        <p>We are pleased to inform you that you have been <b>selected</b> for the position of <b>${jobTitle}</b> (Job ID: <strong>${jobId}</strong>) at <b>Genoviq Healthcare Pvt. Ltd.</b>.</p>
        <p>Your skills and experience stood out among many talented candidates, and we’re excited to welcome you aboard.</p>
        <p>Our HR team will reach out to you shortly with the next steps and onboarding process.</p>
        <br/>
        <p>Congratulations once again, and we look forward to working with you!</p>
        <p><b>Best regards,</b><br/>Genoviq Healthcare Pvt. Ltd.</p>
      `,
    });

    console.log(`✅ Acceptance email sent to ${email}`);
  } catch (err) {
    console.error("❌ Acceptance email error:", err);
    throw err;
  }
};
