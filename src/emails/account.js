const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (email, name) => sgMail.send({
    to: 'kbaswa12@gmail.com',
    from: 'kbaswa12@gmail.com',
    subject: `${email}`,
    text: `Hi ${name}, Portfolio mail`
});

const sendAccDeactEmail = (email, name) => sgMail.send({
    to: 'kbaswa12@gmail.com',
    from: 'kbaswa12@gmail.com',
    subject: 'Account Deactivated',
    text: `Hi ${name}, Your account has deactivated.`
});

const sendResetTokenEmail = (name, email, resetToken, hostName) => sgMail.send({
    to: 'kbaswa12@gmail.com',
    from: 'kbaswa12@gmail.com',
    subject: 'Reset your password',
    text: `Hi ${name}, click on the link
           http://${hostName}/#/reset-password/${resetToken}`
});

module.exports = {
    sendMail,
    sendAccDeactEmail,
    sendResetTokenEmail
}