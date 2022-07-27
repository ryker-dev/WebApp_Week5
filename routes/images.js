const express = require('express');
const Image = require("../models/Image");
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.get('/', function(req, res, next) {
  res.send("<h1>Hello!</>");
});


router.post('/', upload.single('recipe-images'), function(req, res, next) {
  if(!req.file) return res.status(204).send("No image given");
  console.log(req.file);
  Image.findOne({name: req.file.originalname}, (err, image) => {
    if (err) return next(err);
    if(!image) {
      new Image({
        name: req.file.originalname,
        buffer: req.file.buffer,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype
      }).save((err) => {
        if(err) return next(err, image);
        return res.send(image.id);
      });
    } else {
      return res.status(403).send("Image already exists!");
    }
  })
});

module.exports = router;
