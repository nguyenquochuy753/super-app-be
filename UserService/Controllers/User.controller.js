const userModel = require('../Models/User.model');
const jwt = require('jsonwebtoken');

const userController = {
    
    register: async(req,res)=>{
        try {
            const { email, fullname, password } = req.body;
            const newUser = new userModel({
                email: email,
                fullname: fullname,
                password: password
            });
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    login: async(req,res)=>{
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            if(!user){
                return res.status(404),json('Gmail not valid!');
            }else{
                if (user.password !== password) {
                    return res.status(404).send('Wrong password!');
                }else{
                    const token = jwt.sign({user: user}, process.env.SECRET_KEY);
                    return res.status(200).json({ token });
                }
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }

}

module.exports = userController;