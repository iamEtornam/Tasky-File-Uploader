const express = require('express');
const router = express.Router();
const { uploadFile } = require('./uploader_service');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

/* POST media file. */
router.post('/', multipartMiddleware,uploadFile);

module.exports = router;
