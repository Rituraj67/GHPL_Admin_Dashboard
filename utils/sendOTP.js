import nodemailer from "nodemailer";

export const sendOTP = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Genoviq Healthcare Pvt. Ltd." <${process.env.EMAIL_ADMIN}>`,
      to: email,
      subject: "Your OTP for Genoviq Admin Panel",
      text: `Your OTP is ${otp}. Valid for 3 minutes.`,
      html: `<p>Your OTP is <b>${otp}</b>. Valid for 3 minutes.</p>`
    });

    console.log(`✅ OTP sent to ${email}`);
  } catch (err) {
    console.error("❌ Nodemailer send error:", err);
    throw err; // rethrow so the route knows it failed
  }
};
