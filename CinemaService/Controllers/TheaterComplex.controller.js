const theaterComplexModel = require('../Models/TheaterComplex.model');

const theaterComplexController = {

    addTheaterComplex: async(req,res)=>{
        try {
            const newTheaterComplex = new theaterComplexModel(req.body);
            await newTheaterComplex.save();
            res.status(201).json(newTheaterComplex);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateTheaterComplex: async (req, res) => {
        try {
            const { _id } = req.params;
            await theaterComplexModel.findByIdAndUpdate(_id, req.body, { new: true });
            res.status(200).json("Updated successfully");
        } catch (error) {
            res.status(400).json(error);
        }
    },

    getAllTheaterComplex: async (req, res) => {
        try {
            const theaterComplexes = await theaterComplexModel.find({});
            res.status(200).json(theaterComplexes);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getTheaterComplexByID: async (req, res) => {
        try {
            const { _id } = req.params;
            const theaterComplex = await theaterComplexModel.findById(_id);
            res.status(200).json(theaterComplex);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteTheaterComplexById: async (req, res) => {
        try {
            const { _id } = req.params;
            await theaterComplexModel.findByIdAndDelete(_id);
            res.status(200).json("Deleted successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = theaterComplexController;