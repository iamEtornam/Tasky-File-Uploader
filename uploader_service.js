const cloudinary = require('cloudinary').v2;
const crypto = require('crypto');

//cloudinary configurations
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadFile = (req, res) => {
  const { files } = req;
  const bucket = process.env.CLOUDINARY_BUCKET

  crypto.randomBytes(16, async (err, buf)=>{
    try {
      if(err) return res.status(400).json({success: false, message: err.message})
      const filename = buf.toString('hex');
      let fileUpload = await cloudinary.uploader.upload(
          files.files.path, {public_id: `${bucket}/${filename}`, overwrite: true},
      );
      fileUpload = {
        ...fileUpload,
        uploaded_filename: fileUpload.original_filename,
        original_filename: files.files.originalFilename,
        api_key: '',
        bucket
      };
      res.status(200).json({success: true, message: 'Upload successful', metadata: fileUpload});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
    }
  });
}

module.exports = {
  uploadFile
}
