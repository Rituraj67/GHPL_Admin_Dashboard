import nodemailer from "nodemailer";

export const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Genoviq Admin" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP for Genoviq Admin Panel",
    text: `Your OTP for accessing the Genoviq Admin Panel is ${otp}. This code is valid for 3 minutes.`,
    html: `<p>Your OTP for accessing the <b>Genoviq Admin Panel</b> is <b>${otp}</b>. This code is valid for 3 minutes.</p>`
  });
};
