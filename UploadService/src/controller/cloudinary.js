const cloudinary = require("cloudinary");
const fs = require("fs");


cloudinary.config({
    cloud_name: "dv8ukm9j4",
    api_key: "667181856888479",
    api_secret: "fkNe1GgtxYuvP0qKxqkt6rm9SZY",
});

exports.uploadImageToCloudinary = async (req, res) => {
    try {
        const { path } = req.body;
        let files = Object.values(req.files).flat();
        let images = [];
        for (const file of files) {
            const img = await uploadToCloudinaryHandler(file, path);
            images.push(img);
            removeTmp(file.tempFilePath);
        }
        res.json(images);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }


};

const uploadToCloudinaryHandler = async (file, path) => {
    return new Promise((resolve) => {
        cloudinary.v2.uploader.upload(
            file.tempFilePath,
            {
                folder: path,
            },
            (err, res) => {
                if (err) {
                    removeTmp(file.tempFilePath);
                    console.log(err);
                    return res
                        .status(400)
                        .json({ message: "Tải hình ảnh lên không thành công." });
                }
                resolve({
                    url: res.secure_url,
                    public_url: res.public_id,
                });
            }
        );
    });
};
const removeTmp = (path) => {
    fs.unlink(path, (error) => {
        if (error) throw error;
    });
};