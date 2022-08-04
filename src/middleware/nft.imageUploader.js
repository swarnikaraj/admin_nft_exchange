var cloudinary = require("cloudinary").v2;

const uploadImage = async (nftObject) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    const result = await cloudinary.uploader.upload(
      nftObject.metadata.image,
      options,
      function (error, result) {
        console.log(result, error);
      }
    );

    const finalUrl = await result.secure_url;
    // console.log(finalUrl, "final url");
    nftObject.cloud_image_url = await finalUrl;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { uploadImage };
