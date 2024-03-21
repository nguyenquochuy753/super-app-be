const router = require('express').Router();
const userController = require('../Controllers/User.controller');
const verifyToken = require('../Middleware/VerifyToken');

router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/', verifyToken ,userController.getAllUsers);

module.exports = router;