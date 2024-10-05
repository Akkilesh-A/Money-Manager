import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

async function cloudinaryUpload(file) {
    try{
        if(file){
            const image = `/uploads/${file}`;
            async function upload() {
                const result = await cloudinary.uploader.upload(image);
                console.log(result);
            }
            upload()
        }
        return result.secure_url
    }catch(err){
        console.log(err);
        return "Error uploading file"
    }
}

export {
    cloudinaryUpload
}