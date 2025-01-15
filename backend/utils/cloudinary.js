import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadProfilePhotoToCloudinary = async (file) => {
  const result = await cloudinary.v2.uploader.upload(file, {
    folder: "Money-Manager/Profile-Photos",
    use_filename: true,
  });
  console.log("Upload successful:", result);
  return result.secure_url;
};

const uploadTransactionPhotoToCloudinary = async (file) => {
  const result = await cloudinary.v2.uploader.upload(file, {
    folder: "Money-Manager/Transaction-Photos",
    use_filename: true,
  });
  console.log("Upload successful:", result);
  return result.secure_url;
};

export const uploadToCloudinary = {
  uploadProfilePhotoToCloudinary,
  uploadTransactionPhotoToCloudinary,
};
