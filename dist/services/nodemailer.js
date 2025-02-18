"use strict";
const nodemailer = require('nodemailer');
// require('dotenv').config()
function sendEmail(email, subject, message) {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        secure: true,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject,
        text: message,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error sending email: ', error);
        }
        console.log('Email sent: ', info.response);
    });
}
module.exports = { sendEmail };
