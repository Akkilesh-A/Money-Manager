import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

async function cloudinaryUpload(file) {
    if(!file){
        return "No File"
    }
    try{
        const image = `./uploads/${file}`;
        const result = await cloudinary.uploader.upload(image,{folder:"Money_Manager/User_Transactions"});
        return result.secure_url
    }catch(err){
        console.log(err);
        return "Error uploading file"
    }
}

async function cloudinaryUploadProfilePhoto(file) {
    if(!file){
        return "No File"
    }
    try{
        const image = `./uploads/${file}`;
        const result = await cloudinary.uploader.upload(image,{folder:"Money_Manager/Profile_Photos"});
        return result.secure_url
    }catch(err){
        console.log(err);
        return "Error uploading file"
    }
}

export {
    cloudinaryUpload,
    cloudinaryUploadProfilePhoto
}