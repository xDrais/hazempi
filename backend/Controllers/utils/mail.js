const optGenerator = require('otp-generator')
const nodemail = require('nodemailer')


let otp= ''
exports.generatorOTP = () => {
    const OTP = optGenerator.generate(10,{specialChars: false});
    return OTP
};

exports.mailTransport = ()=>
    nodemail.createTransport({
        service: process.env.service,
        auth:{
            user:process.env.user,
            pass:process.env.pass
        }

    })

