const express = require('express');
const router = express.Router();
const Template = require("../../models/TemplateModel");
const multer = require('multer');


const FileStorage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
})
const upload=multer({storage:FileStorage})


router.route("/add").post(upload.single("file") , async (req,res) =>{


    const upload =new Template({
        category: req.body.category,
        file: req.file.originalname
    })
    try {
        const newUpload = await upload.save();
        res.send(newUpload);

    }catch(err) {

    }

})

router.route("/view").get( async (req,res) => {
    const uploads = await Template.find({})
    res.status(200).json(uploads)
    console.log(uploads);
})

router.route("/download/:id").get( async (req,res) => {
    const uploads = await Template.findById({})
    const location = "C:\\Users\\Ushan\\Desktop\\testing\\back\\uploads"+ uploads.file;
    res.download(location);
    console.log(location);
})

module.exports = router;