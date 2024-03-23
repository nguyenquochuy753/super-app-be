const nodemailer = require('nodemailer');
const userModel = require('../Models/User.model');
const { trusted } = require('mongoose');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'huynq1909@gmail.com',
        pass: 'hgae jbpk vgtc tkqk'
    }
});



const sendMail = async(req,res)=>{

    const randomOTP = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    let htmlContent = `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                }
                .container {
                    margin: 50px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h2 {
                    color: #007bff;
                }
                .otp-code {
                    font-size: 24px;
                    font-weight: bold;
                    color: #28a745;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>OTP Code to verify password change</h2>
                <p>Your OTP code is: <span class="otp-code">${randomOTP}</span></p>
            </div>
        </body>
        </html>
    `;

    let mailOptions = {
        from: 'huynq1909@gmail.com',
        to: req.body.email,
        subject: 'OTP code to verify password change',
        html: htmlContent
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    const updateOtpForUser = await userModel.findOne({ email : req.body.email });

    if(updateOtpForUser){
        updateOtpForUser.otp = randomOTP;
        await updateOtpForUser.save();

        res.status(200).json('Please go to your email to get the otp code');
    }else{
        res.status(400).json('Email is not registered');
    }

    
}

module.exports = sendMail;
