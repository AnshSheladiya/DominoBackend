const ImageKit = require("imagekit");
const config = require("../../config");

const imagekit = new ImageKit({
  publicKey: config.imagekit.publicKey,
  privateKey: config.imagekit.privateKey,
  urlEndpoint: `https://ik.imagekit.io/${config.imagekit.urlEndpoint}/`,
});

module.exports = imagekit;
