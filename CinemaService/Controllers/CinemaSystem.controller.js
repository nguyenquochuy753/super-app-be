const cinemaSystemModel = require("../Models/CinemaSystem.model");
const slugify = require("slugify");

const cinemaSystemController = {

    addCinemaSystem: async(req,res)=>{
        try {
            let alias = slugify(req.body.name,{
                replacement: '-',
                lower: true
            });
            const newCinemaSystem = new cinemaSystemModel({
                name: req.body.name,
                logo: req.body.logo,
                aliases: alias
            })
            await newCinemaSystem.save();
            res.status(201).json(newCinemaSystem);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateCinemaSystem: async(req,res)=>{
        try {
            const {_id} = req.params;
            await cinemaSystemModel.findByIdAndUpdate(_id,req.body,{new: true});
            res.status(200).json("Updated successfully");
        } catch (error) {
            res.status(400).json(error);
        }
    },

    getAllCinemaSystem: async(req,res)=>{
        try {
            const cinemaSystems = await cinemaSystemModel.find({});
            res.status(200).json(cinemaSystems);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getCinemaSystemByID: async(req,res)=>{
        try {
            const {_id} = req.params;
            const cinemaSystem = await cinemaSystemModel.findById(_id);
            res.status(200).json(cinemaSystem);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteCinemaSystemById: async(req,res)=>{
        try {
            const {_id} = req.params;
            await cinemaSystemModel.findByIdAndDelete(_id);
            res.status(200).json("Deleted successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = cinemaSystemController;