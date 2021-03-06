const nodemailer = require('nodemailer');
const handlebars = require('nodemailer-express-handlebars');

const sendEmail = async (from: string, to: string, subject: string, template: string, context: object) => {
  const mailOptions = {
    from,
    to,
    subject,
    template,
    context
  };

  const transporter = await nodemailer.createTransport({
    host: `${process.env.SMTP_HOST}`,
    port: Number(`${process.env.SMTP_PORT}`) || 0,
    secure: false,
    auth: {
      user: `${process.env.SMTP_USERNAME}`,
      pass: `${process.env.SMTP_PASSWORD}`
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  await transporter.use('compile', handlebars({
    viewEngine: {
      extName: '.hbs',
      partialsDir: './src/views/email_templates',
      defaultLayout: false,
    },
    viewPath: './src/views/email_templates',
    extName: '.hbs',
    path: './src/views/email_templates'
  }));

  await transporter.sendMail(mailOptions);

  return;
};

export { sendEmail };
