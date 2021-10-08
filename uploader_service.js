const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');


aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    acl: 'public-read',
    s3,
      bucket: process.env.AWS_BUCKET,
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