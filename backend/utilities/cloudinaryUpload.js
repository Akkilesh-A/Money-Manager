import cloudinary from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config();

async function cloudinaryUpload(id,image){
    // Configuration
    cloudinary.config({ 
        cloud_name: 'djeplonq5', 
        api_key: '443613367272531', 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
    });
    
    // Upload an image
    const uploadResult = await cloudinary.uploader
    .upload(
        image, {
            public_id: `Profile-Pic-${id}`,
        },{ folder: "MERN - Banking App/Profile Photos" },
    )
    .catch((error) => {
        console.log(error);
    });    
    
    return uploadResult.secure_url; 
}

export {cloudinaryUpload}