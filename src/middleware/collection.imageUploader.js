var cloudinary = require("cloudinary").v2;

const uploadImage = async (req, res, next) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    const result = await cloudinary.uploader.upload(
      req.body.imageURL,
      options,
      function (error, result) {
        console.log(result, error);
      }
    );
    
    const finalUrl = result.secure_url;
    console.log(finalUrl, "final url");
    req.body.cloud_image_url = finalUrl;
  } catch (err) {
    console.log(err);
  }

  next();
};

module.exports = { uploadImage };
