//cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const koaMulter = require('koa-multer');
const config = require('../../config');

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'domino',
    allowed_formats: ['jpg', 'jpeg', 'png', 'mp4'], // Add 'mp4' here for video support
    // Transformation settings for video (modify as needed)
    // resource_type: 'video',
    // format: 'mp4',
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const parser = koaMulter({ storage: storage });

module.exports = { cloudinary, parser };
