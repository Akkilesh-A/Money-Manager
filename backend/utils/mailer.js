import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "akkilalagar05@gmail.com",
    pass: "fcwa fndd htbo xihg",
  },
});

const sendMail = async (to, subject, text = "", html = "") => {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_ID,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.log("mailer error", error);
  }
};

export default sendMail;
