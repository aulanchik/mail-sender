const mgs = require('../services/mailgun');
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');

const sendEmail = async (req, res) => {
    const { recepientA, recepientB, subject, dataA, dataB } = req.body;
    
    if (!recepientA || !recepientB || !subject || !dataA || !dataB) {
        res.status(400).json({ error: 'All fields are required to be filled in.'});
    }

    try {
        const templatePathA = path.join(__dirname, '../templates/a.html');
        const templateSourceA = fs.readFileSync(templatePathA, 'utf-8');
        const templateA = handlebars.compile(templateSourceA);

        const templatePathB = path.join(__dirname, '../templates/b.html');
        const templateSourceB = fs.readFileSync(templatePathB, 'utf-8');
        const templateB = handlebars.compile(templateSourceB);

        const htmlContentA = templateA(dataA);
        const htmlContentB = templateB(dataB);

        await Promise.allSettled([
            mgs.sendEmail(recepientA, subject, htmlContentA),
            mgs.sendEmail(recepientB, subject, htmlContentB)
        ]);

        const successResults = results.filter(r => r.status === 'fulfilled').map(r => r.value);
        const failedResults = results.filter(r => r.status === 'rejected').map(r => r.reason);

        res.status(200).json({
            message: "Emails sent successfully!",
            successes: successResults,
            failures: failedResults,
        });
        
    } catch (err) {
        console.log(err);
        res.send(500).json({
            error: "Failed to send out emails.",
            details: err.message
        })
    }
}

module.exports = sendEmail;
