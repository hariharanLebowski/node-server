var nodemailer = require('nodemailer');
const { smtp } = require('../config');



const sendEmail = (data) => {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport(smtp);
        const sendTo4dFlo = {
            to: data.to,
            from: data.from,
            subject: data.subject,
            text: data.text,
            html: data.html
        }
        transporter.sendMail(sendTo4dFlo, (error, info) => {
            if (error)
                return reject(error)
            resolve(info);
        })
    })
}


module.exports = sendEmail