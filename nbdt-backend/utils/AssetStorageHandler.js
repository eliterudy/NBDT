var path = require("path");
var multer = require("multer");
const { v4 } = require("uuid");

var ImageKit = require("imagekit");
var config = require("../config/config");
var imagekit = new ImageKit({
  publicKey: `${config.IMAGEKIT_PUBLIC_KEY}`,
  privateKey: `${config.IMAGEKIT_PRIVATE_KEY}`,
  urlEndpoint: `https://ik.imagekit.io/${config.IMAGEKIT_ID}/`,
});

const uploadPhoto = async (file, path, width = 1080, height = 1080) => {
  var imageKitResponse = await imagekit
    .upload({
      file: file.buffer,
      fileName: v4(),
      folder: `${config.IMAGEKIT_FOLDER}/${path}`,
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
      return {
        success: true,
        result: {
          image_url: url,
          file_id: response.fileId,
          file_path: response.filePath,
          name: response.name,
        },
      };
    })
    .catch((e) => {
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

const deletePhoto = async (id) => {
  imagekit.deleteFile(id, (error, result) => {});
};

module.exports = { uploadPhoto, deletePhoto, multerConfig };
