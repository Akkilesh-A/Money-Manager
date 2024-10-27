import  nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "akkilalagar05@gmail.com",
    pass: "bszk rygd qtuo rzfq",
  },
});

async function sendMail(to,subject,text,html) {
  const info = await transporter.sendMail({
    from: '"Money Muncher" <akkilalagar05@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html:html, // html body
  });
  return info
}


export {
    sendMail
}