const router = require('express').Router();
const userController = require('../Controllers/User.controller');
const verifyToken = require('../Middleware/VerifyToken');
const sendMail = require('../SendMail/SendMail');
const verifyOTP = require('../Middleware/VerifyOTP');

router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/', verifyToken, userController.getAllUsers);
router.patch('/', verifyToken, userController.updateUser);
router.delete('/', verifyToken, userController.deleteUser);
router.post('/sendMail',sendMail);
router.patch('/changePassword', verifyOTP, userController.changePassword);

module.exports = router;