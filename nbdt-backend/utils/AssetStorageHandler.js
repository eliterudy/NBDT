var path = require("path");
const { v4 } = require("uuid");
const Configs = require("../config");

const { gcpStorage: gc } = require("../config/index");
const bucket = gc.bucket(Configs.GOOGLE_STORAGE_BUCKET); // should be your bucket name

const uploadPhoto = (file, path, width = 1080, height = 1080) => {
  path = path.substring(1);
  const { buffer, mimetype: contentType } = file;
  const imageName = v4();
  const image = bucket.file(`${path}/${imageName}`);
  const uploadResponse = image.save(buffer, { contentType }, (err) => {
    if (!err) {
      const imageServerUrl = `${Configs.GOOGLE_STORAGE_URL}/${Configs.GOOGLE_STORAGE_BUCKET}/${path}/${imageName}`;
      return {
        success: true,
        result: {
          image_url: imageServerUrl,
          file_id: imageName,
          file_path: `/${path}`,
          name: imageName,
        },
      };
    } else {
      return { success: false, url: "" };
    }
  });

  return uploadResponse;
};

const deletePhoto = async (fileName, path) => {
  path = path.substring(1);
  bucket
    .file(`${path}/${fileName}`)
    .delete()
    .then((resp) => {});
};

module.exports = { uploadPhoto, deletePhoto };
