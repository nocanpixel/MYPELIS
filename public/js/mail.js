const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');



const auth = {
    auth: {
        api_key: 'bb30b142e91c418ba3dd89c957764cf1-aa4b0867-f087a36a',
        domain: 'sandbox0df26769de7c4c088f70099b22c8a293.mailgun.org'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));


const sendMail = (email,text, cb) => {
    const mailOptions = {
        from: email, // TODO replace this with your own email
        to: 'mypelisq@gmail.com', // TODO: the receiver email has to be authorized for the free tier
        subject: 'PETICION PELICULA',
        text
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
}

module.exports = sendMail;

/*
Obviously
*/