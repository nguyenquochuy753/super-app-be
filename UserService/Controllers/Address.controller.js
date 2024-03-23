const addressModel = require('../Models/Address.model');

const addressController = {
    addAddress: async(req,res)=>{
        try {
            const { _id } = req.user;
            const newAddress = new addressModel(req.body);
            newAddress.userId = _id;
            await newAddress.save();
            res.status(201).json(newAddress);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAddressByUserId: async(req,res)=>{
        try {
            const { _id } = req.user;
            const address = await addressModel.find({ userId: _id });
            res.status(200).json(address);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateAddressById: async(req,res)=>{
        try {
            const { _id } = req.params;
            const address = await addressModel.findByIdAndUpdate(_id,req.body,{new: true});
            res.status(200).json({message: "Updated address successfully", address});
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteAddressById: async(req,res)=>{
        try {
            const { _id } = req.params;
            await addressModel.findByIdAndDelete(_id);
            res.status(200).json({ message: "Deleted address successfully" });
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = addressController;