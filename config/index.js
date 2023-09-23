require('dotenv').config();

const config = {
  appName: 'Domino',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8383,
  database: {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/domino',
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};

module.exports = config;