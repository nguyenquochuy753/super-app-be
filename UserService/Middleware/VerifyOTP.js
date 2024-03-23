const userModel = require('../Models/User.model');

const verifyOTP = async(req,res,next)=>{
    try {
        const { otp, email } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            if (user.otp === otp) {
                req.user = user;
                next();
            }
            else return res.status(400).json('Wrong OTP');
        } else return res.status(400).json('Email invalid');
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = verifyOTP;