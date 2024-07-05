const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

let mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'mariaelisagmt@gmail.com, fmfr@outlook.com, georgeferreirati@gmail.com, neresfelip@gmail.com', 
  text: 'A pipeline falhou. Por favor, verifique o logs no GitHub Actions para mais detalhes.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Email sent: ' + info.response);
});