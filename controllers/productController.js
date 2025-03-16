import { uploadToCloudinary } from "../config/cloudinary.js";
import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  const { name, composition, division, mrp, description, packaging, type } =
    req.body;
  console.log(name, composition, division, mrp, description, packaging, type);

  try {
    const images = await Promise.all(
      req.files.map(async (file) => {
        // const { croppedUrl } = await uploadToCloudinary(file.buffer);
        const { url } = await uploadToCloudinary(file.buffer);
        return url;
      })
    );
    const product = await Product.create({
      name,
      composition,
      division,
      mrp,
      images,
      description,
      packaging,
      type,
    });
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getProducts = async (req, res) => {
  const products = await Product.findAll();
  res.status(200).json(products);
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      mrp,
      composition,
      description,
      division,
      type,
      packaging,
      existingImages,
    } = req.body;

    const parsedExistingImages = existingImages
      ? JSON.parse(existingImages)
      : [];

    // 1. Upload new images to Cloudinary

    const newUploadedImageUrls = await Promise.all(
      req.files.map(async (file) => {
        // const { croppedUrl } = await uploadToCloudinary(file.buffer);
        const { url } = await uploadToCloudinary(file.buffer);
        return url;
      })
    );

    // 2. Merge retained existing image URLs + new uploaded image URLs
    const images = [...parsedExistingImages, ...newUploadedImageUrls];

    // 3. Update the product

    const updatedProduct = await Product.update(
      {
        name,
        mrp,
        composition,
        description,
        division,
        type,
        packaging,
        images,
      },
      {
        where: { id }, // Match by product ID
        returning: true, // Returns the updated row(s) in Postgres
      }
    );

    // Sequelize returns [numberOfAffectedRows, [updatedRows]]
    const updated = updatedProduct[1][0]; // Get the first updated product

    res.status(200).json({
      message: "Product updated successfully",
      product: updated,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
