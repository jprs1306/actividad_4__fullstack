const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const verifyToken = require('../middleware/auth.middleware');

// Rutas Públicas
router.get('/', productController.getProducts);

// Rutas Privadas (Necesitan Token)
router.post('/', verifyToken, productController.createProduct);


router.put('/:id', verifyToken, productController.updateProduct);

router.delete('/:id', verifyToken, productController.deleteProduct);

module.exports = router;