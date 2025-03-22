import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import streamifier from "streamifier";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Upload Image or Any Auto-detected Media (Image/Video)
export const uploadToCloudinary = async (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    const uniquePublicId = `Genoviq_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const stream = cloudinary.uploader.upload_stream(
      { public_id: uniquePublicId, resource_type: "auto" },
      (error, result) => {
        if (error) return reject(error);

        const optimizeUrl = cloudinary.url(result.public_id, {
          fetch_format: "auto",
          quality: "auto",
        });

        const autoCropUrl = cloudinary.url(result.public_id, {
          crop: "auto",
          gravity: "auto",
          width: 480,
          height: 320,
        });

        resolve({
          url: result.secure_url,
          optimizedUrl: optimizeUrl,
          croppedUrl: autoCropUrl,
        });
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// Upload PDF or Other Files as Raw
export const uploadPdfToCloudinary = async (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    const uniquePublicId = `Genoviq_Resume_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const stream = cloudinary.uploader.upload_stream(
      { public_id: uniquePublicId, resource_type: "raw" },
      (error, result) => {
        if (error) return reject(error);


        resolve({
          url: result.secure_url,
          originalFilename: result.original_filename,
          publicId: result.public_id,
        });
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};
