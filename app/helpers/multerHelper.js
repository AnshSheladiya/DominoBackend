// multerHelper.js

const multer = require('@koa/multer');

// Configure the storage for uploaded files
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename for uploaded files
  },
});

// Create a multer instance with the configured storage
const upload = multer({ storage: storage });

module.exports = upload;
