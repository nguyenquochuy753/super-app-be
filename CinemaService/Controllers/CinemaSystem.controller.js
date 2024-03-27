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
    }

}

module.exports = cinemaSystemController;