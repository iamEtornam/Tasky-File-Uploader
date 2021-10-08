const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const env = process.env.NODE_ENV || 'aws_credentials';
const config = require('./config.json')[env];

aws.config.update({
  secretAccessKey: config.secretAccessKey,
  accessKeyId: config.accessKeyId,
  region: config.region
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    acl: 'public-read',
    s3,
      bucket: config.bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, Object.assign({}, req.body));
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  }),
  limits: { fileSize: 100000000 }
});
module.exports = upload;