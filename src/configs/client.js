const Mailgun = require('mailgun.js');
const formData = require('form-data');
const dotenv = require('dotenv');
dotenv.config();

const mailgun = new Mailgun(formData);

const client = mailgun.create({
    username: process.env.MAILGUN_USERNAME || 'api',
    key: process.env.MAILGUN_API_KEY
});

module.exports = { client }
