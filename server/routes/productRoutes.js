const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.listProducts);
router.get('/:productId', productController.productDetails);
router.get('/info/:productName',productController.getProductInfo);
router.get('/api/products', productController.name)

// New API routes for product information
router.get('/api/productInfo', productController.getAllProducts);
router.get('/api/productInfo/:id', productController.getProductById);

module.exports = router;