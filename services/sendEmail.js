const nodemailer = require("nodemailer");


const sendEmail = async (options) => {
    var transporter = nodemailer.createTransport({
       service : "gmail", //which service to send message such as gmail, hotmail,yahoo etc
        auth: {
            user: process.env.EMAIL_USER,  //sender email
            pass: process.env.EMAIL_PASS,  //sender password
        },tls: {
            rejectUnauthorized: false
          }
    });

    const mailOptions = {
        from :"TrekCompanion <thearcher010@gmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    
    await transporter.sendMail(mailOptions);

};

module.exports = sendEmail;
