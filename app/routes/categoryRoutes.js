// categoryRoutes.js
const Router = require('koa-router');
const router = new Router();
const categoryController = require('../controllers/categoryController');
const parser = require('../helpers/multer');

// Create a new category
router.post('/', categoryController.createCategory);

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get a specific category by ID
router.get('/:id', categoryController.getCategoryById);

// Update a category by ID
router.put('/:id', categoryController.updateCategory);

// Delete a category by ID
router.delete('/:id', categoryController.deleteCategory);

// Upload images for a specific category
router.post("/:id/upload-images", parser.array('images'), categoryController.uploadImages);

// Update an image by ID for a specific category
router.put("/:id/update-image/:imageId",parser.array('images'), categoryController.updateImage);

module.exports = router.routes();