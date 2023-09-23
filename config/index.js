require('dotenv').config();

const config = {
  appName: 'Domino',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8383,
  NODE_ENV:process.env.NODE_ENV,
  database: {
    url: process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0.i1ncqui.mongodb.net/Domino?retryWrites=true&w=majority',
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};

module.exports = config;