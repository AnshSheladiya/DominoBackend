const Category = require("../models/categoryModel");
const { cloudinary } = require("../helpers/cloudinary");
const { Readable } = require("stream");
const { default: mongoose } = require("mongoose");

// Create a new category
exports.createCategory = async (ctx) => {
  try {
    const category = new Category(ctx.request.body);
    await category.save();

    ResponseHelper.success(ctx, 201, MSG.SUCCESS_CREATE_CATEGORY, category);
  } catch (error) {
    ResponseHelper.error(ctx, 400, MSG.FAILED_CREATE_CATEGORY, error);
  }
};

// Get all categories
exports.getAllCategories = async (ctx) => {
  try {
    const categories = await Category.find();

    ResponseHelper.success(ctx, 200, MSG.SUCCESS, categories);
  } catch (error) {
    ResponseHelper.error(ctx, 400, MSG.FAILED_RETRIEVE_CATEGORIES, error);
  }
};

// Get a specific category by ID
exports.getCategoryById = async (ctx) => {
  try {
    const category = await Category.findById(ctx.params.id);

    if (!category) {
      ResponseHelper.error(ctx, 404, MSG.CATEGORY_NOT_FOUND);
    } else {
      ResponseHelper.success(ctx, 200, MSG.SUCCESS, category);
    }
  } catch (error) {
    ResponseHelper.error(ctx, 400, MSG.FAILED_RETRIEVE_CATEGORY, error);
  }
};

// Update a category by ID
exports.updateCategory = async (ctx) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body,
      { new: true }
    );

    if (!updatedCategory) {
      ResponseHelper.error(ctx, 404, MSG.CATEGORY_NOT_FOUND);
    } else {
      ResponseHelper.success(
        ctx,
        200,
        MSG.SUCCESS_UPDATE_CATEGORY,
        updatedCategory
      );
    }
  } catch (error) {
    ResponseHelper.error(ctx, 400, MSG.FAILED_UPDATE_CATEGORY, error);
  }
};

// Delete a category by ID
exports.deleteCategory = async (ctx) => {
  try {
    const deletedCategory = await Category.findByIdAndRemove(ctx.params.id);

    if (!deletedCategory) {
      ResponseHelper.error(ctx, 404, MSG.CATEGORY_NOT_FOUND);
    } else {
      ResponseHelper.success(ctx, 204);
    }
  } catch (error) {
    ResponseHelper.error(ctx, 400, MSG.FAILED_DELETE_CATEGORY, error);
  }
};

exports.uploadImages = async (ctx) => {
  try {
    const categoryId = ctx.params.id;
    const images = ctx.req.files;
    const uploadedImages = [];

    for (const image of images) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            /* Cloudinary upload options here */
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        const bufferStream = new Readable();
        bufferStream.push(image.buffer);
        bufferStream.push(null);

        bufferStream.pipe(uploadStream);
      });

      const imageObject = {
        url: result.secure_url,
        mimeType: image.mimetype,
        dimensions: {
          width: result.width,
          height: result.height,
        },
        uploadedAt: new Date(),
      };

      uploadedImages.push(imageObject);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $push: { images: { $each: uploadedImages } } },
      { new: true }
    );

    if (!updatedCategory) {
      ResponseHelper.error(ctx, 404, MSG.CATEGORY_NOT_FOUND);
      return;
    }

    ResponseHelper.success(
      ctx,
      200,
      MSG.SUCCESS_UPDATE_CATEGORY,
      updatedCategory
    );
  } catch (error) {
    console.log(error);
    ResponseHelper.error(ctx, 400, MSG.FAILED_UPLOAD_IMAGES, error.message);
  }
};

exports.updateImage = async (ctx) => {
  try {
    const imageId = ctx.params.imageId;
    const categoryId = ctx.params.id;

    const newImage = ctx.req.files[0];

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {},
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      const bufferStream = new Readable();
      bufferStream.push(newImage.buffer);
      bufferStream.push(null);

      bufferStream.pipe(uploadStream);
    });

    const updatedImageData = {
      url: result.secure_url,
      mimeType: newImage.mimetype,
      dimensions: {
        width: result.width,
        height: result.height,
      },
      updatedAt: new Date(),
    };

    const updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryId, "images._id": mongoose.Types.ObjectId(imageId) },
      {
        $set: {
          "images.$.url": updatedImageData.url,
          "images.$.mimeType": updatedImageData.mimeType,
          "images.$.dimensions": updatedImageData.dimensions,
          "images.$.updatedAt": updatedImageData.updatedAt,
        },
      },
      { new: true }
    );

    if (!updatedCategory) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        message: "Image not found or category not found",
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: "Image updated successfully",
      data: updatedCategory,
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: "Failed to update image",
      error: error.message,
    };
  }
};
