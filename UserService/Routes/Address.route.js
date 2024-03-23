const router = require('express').Router();
const addressController = require('../Controllers/Address.controller');
const verifyToken = require('../Middleware/VerifyToken');

router.post('/', verifyToken,  addressController.addAddress);
router.get('/addressByUserId', verifyToken, addressController.getAddressByUserId);
router.patch('/:_id', addressController.updateAddressById);
router.delete('/:_id', addressController.deleteAddressById);

module.exports = router;