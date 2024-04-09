// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const { connectDatabase, queryDatabase } = require('../data/database');

// // Conectar a la base de datos
// connectDatabase();

// router.get('/register2', (req, res) => {

// 	res.json({
// 		id: id,
// 		name: 'String',
// 		description: 'String',
// 		height: 'Number',
// 		length: 'Number',
// 		width: 'Number'
// 	});
// });

// router.get('/products', (req, res) => {

// 	res.json({
// 		id: id,
// 		name: 'String',
// 		description: 'String',
// 		height: 'Number',
// 		length: 'Number',
// 		width: 'Number'
// 	});
// 	const sql = 'select * from users ';
// 	queryDatabase(sql, [], (err, result) => {
// 		if (err) {
// 			console.error('Error al ejecutar la consulta:', err);
// 			return;
// 		}
// 		res.status(201).json({ id: result.insertId, name });
// 	});
// });

// // router.get('/products/:id', verifyToken, (req, res) => {
// // 	const { id } = req.params;
// // 	res.json({
// // 		id: id,
// // 		name: 'String',
// // 		description: 'String',
// // 		height: 'Number',
// // 		length: 'Number',
// // 		width: 'Number'
// // 	});
// // });

// // router.post('/products/:id', verifyToken, (req, res) => {
// // 	const { id } = req.params;
// // 	res.json({
// // 		id: id,
// // 		name: 'String',
// // 		description: 'String',
// // 		height: 'Number',
// // 		length: 'Number',
// // 		width: 'Number'
// // 	});
// // });

// // router.put('/products/:id', verifyToken, (req, res) => {
// // 	const { id } = req.params;
// // 	res.json({
// // 		id: id,
// // 		name: 'String',
// // 		description: 'String',
// // 		height: 'Number',
// // 		length: 'Number',
// // 		width: 'Number'
// // 	});
// // });

// // router.delete('/products/:id', verifyToken, (req, res) => {
// // 	const { id } = req.params;
// // 	res.json({
// // 		id: id,
// // 		name: 'String',
// // 		description: 'String',
// // 		height: 'Number',
// // 		length: 'Number',
// // 		width: 'Number'
// // 	});
// // });

// module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controller/productController');
const { verifyToken } = require('../controller/verifyToken');

router.get('/products', verifyToken, getAllProducts);

// Ruta para obtener un producto por su ID
router.get('/products/:id', verifyToken, getProductById);

// Ruta para crear un nuevo producto
router.post('/products', verifyToken, createProduct);

// Ruta para editar un producto
router.put('/products/:id', verifyToken, updateProduct);

// Ruta para eliminar un producto
router.delete('/products/:id', verifyToken, deleteProduct);


module.exports = router;
