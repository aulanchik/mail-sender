const client = require('../configs/client');
const dotenv = require('dotenv');
dotenv.config();

const sendEmail = (recepient, subject, html) => {
    var sender = `${process.env.SENDER} <noreplay@${process.env.DOMAIN}>`

    return client.messages.create(process.env.DOMAIN, {
        from: sender,
        recepient,
        subject,
        html
    })
};

module.exports = { sendEmail };
