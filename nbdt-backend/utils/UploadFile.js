var path = require("path");
var Resize = require("./Resize");
var multer = require("multer");
const { v4 } = require("uuid");

var ImageKit = require("imagekit");
var config = require("../config/config");
var imagekit = new ImageKit({
  publicKey: `${config.IMAGEKIT_PUBLIC_KEY}`,
  privateKey: `${config.IMAGEKIT_PRIVATE_KEY}`,
  urlEndpoint: `https://ik.imagekit.io/${config.IMAGEKIT_ID}/nbdt/`,
});

const uploadPhoto = async (
  file,
  category_type = env.DEFAULT_CATEGORY_TYPE,
  folder_name = env.DEFAULT_FOLDER_NAME,
  width = 400,
  height = 400
) => {
  var imageKitResponse = await imagekit
    .upload({
      file: file.buffer,
      fileName: `${v4()}.jpg`,
      folder: `nbdt/${category_type}/${folder_name}`,
      /* ------- to transform images to specific aspects ||| DONT DELETE  -------- */
      // width: width,
      // height: height,
    })
    .then(async (response) => {
      var url = await imagekit.url({
        src: response.url,
        /* ------- to transform images to specific aspects ||| DONT DELETE  -------- */
        // transformation: [
        //   {
        //     height: height,
        //     width: width,
        //     aspectRatio: 1 / 1,
        //   },
        // ],
      });
      return { success: true, url };
    })
    .catch((error) => {
      return { success: false, url: "" };
    });
  return imageKitResponse;
};

const multerConfig = () =>
  multer({
    limits: {
      fileSize: 40 * 720 * 720,
    },
  });

module.exports = { uploadPhoto, multerConfig };
