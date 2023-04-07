var path = require("path");
const { v4 } = require("uuid");

var ImageKit = require("imagekit");
var Configs = require("../config/index");
var imagekit = new ImageKit({
  publicKey: `${Configs.IMAGEKIT_PUBLIC_KEY}`,
  privateKey: `${Configs.IMAGEKIT_PRIVATE_KEY}`,
  urlEndpoint: `https://ik.imagekit.io/${Configs.IMAGEKIT_ID}/`,
});

const uploadPhoto = async (file, path, width = 1080, height = 1080) => {
  var imageKitResponse = await imagekit
    .upload({
      file: file.buffer,
      fileName: v4(),
      folder: `${Configs.IMAGEKIT_FOLDER}/${path}`,
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

const deletePhoto = async (id) => {
  imagekit.deleteFile(id, (error, result) => {});
};

module.exports = { uploadPhoto, deletePhoto };
