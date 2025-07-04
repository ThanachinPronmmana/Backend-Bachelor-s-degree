const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.sendResetEmail = async (to, link) => {
  await transporter.sendMail({
    to,
    subject: 'Reset Your Password',
    html: `<p>Click the link to reset your password: <a href="${link}">Reset Password</a></p>`
  });
};

exports.verifyemail = async (to, link) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })
  await transporter.sendMail({
    to,
    subject: "Please verify your email",
    html: `<p>Click the link below to verify your email:</p>
    <a href="${link}">${link}</a>`,
  })
}