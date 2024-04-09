const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controller/productController');
const { verifyToken } = require('../controller/verifyToken');

//  obtener todos los productos
router.get('/products', verifyToken, getAllProducts);

//  obtener un producto por su ID
router.get('/products/:id', verifyToken, getProductById);

//  crear un nuevo producto
router.post('/products', verifyToken, createProduct);

//  editar un producto
router.put('/products/:id', verifyToken, updateProduct);

//  eliminar un producto
router.delete('/products/:id', verifyToken, deleteProduct);


module.exports = router;
