const express = require('express');
const router = express.Router();

const upload = require('./uploader_service');

const singleUpload = upload.single('file');


router.post('/', function(req, res) {
  singleUpload(req, res, function(err) {
    if (err) {
      return res.status(401).send(
        {
          message: 'File Upload Error',
          detail: err.message
        });
    }
console.log(req.file.size)
    return res.status(200).send({
      fileUrl: `${req.file.location}`
    });
  });
});

module.exports = router;