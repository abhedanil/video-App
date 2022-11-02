const express = require('express')
const videoController = require('../controllers/videocontroller')
const router= express.Router()
const multer = require('multer')
const fs= require('fs')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync("public")) {
        fs.mkdirSync("public");
      }
  
      if (!fs.existsSync("public/videos")) {
        fs.mkdirSync("public/videos");
      }
  
      cb(null, "public/videos");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      var ext = path.extname(file.originalname);
  
      if (ext !== ".mkv" && ext !== ".mp4") {
        return cb(new Error("Only videos are allowed!"));
      }
  
      cb(null, true);
    },
  });
  






//get all media
router.get("/getAllvideos", videoController.getAll);

//post create new media
router.post(
  "/create",
  upload.fields([
    {
      name: "videos",
      maxCount: 5,
    },
  ]),
  videoController.create
);


module.exports = router