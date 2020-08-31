var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hulkiron70@gmail.com',
        pass: 'spspDFDF@10'
    }
});

var mailOptions = {
    from: 'Punisher@gmail.com',
    to: '',
    subject: 'Sending Email using Node.js',
    text: 'Chnage your password'
};


function send(email, clbk) {
    mailOptions.to = email;
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            clbk(false);
        } else {

            console.log('Email sent: ' + info.response);
            clbk(true);
        }
    });
}

module.exports = send;