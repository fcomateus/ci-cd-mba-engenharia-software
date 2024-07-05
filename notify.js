const nodemailer = require('nodemailer');

// Configure o transporte de e-mail
let transporter = nodemailer.createTransport({
  service: 'gmail', // ou qualquer outro serviço de e-mail
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Configure as opções de e-mail
let mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'brunonnalves@edu.unifor.br, sconstantino@edu.unifor.br', // Lista de e-mails separados por vírgula
  subject: 'Pipeline Failed',
  text: 'A pipeline falhou. Por favor, verifique o logs no GitHub Actions para mais detalhes.',
};

// Envie o e-mail
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Email sent: ' + info.response);
});