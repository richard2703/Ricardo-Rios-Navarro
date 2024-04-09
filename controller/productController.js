const express = require('express');
const { queryDatabase } = require('../data/database');

const bodyParser = require('body-parser');
// app.use(bodyParser.json());

// Función para obtener todos los productos
// function getAllProducts(req, res) {
// 	const sql = 'SELECT * FROM users';

// 	queryDatabase(sql, [], (err, result) => {
// 		if (err) {
// 			console.error('Error al ejecutar la consulta:', err);
// 			res.status(500).json({ error: 'Error al obtener los productos.' });
// 			return;
// 		}
// 		res.status(200).json(result);
// 	});
// }

// Función asincrónica para obtener todos los productos
async function getAllProducts(req, res) {
	try {
		console.log('entro');
		const sql = 'SELECT * FROM catalog_products';
		const results = await queryDatabase(sql, []);

		res.status(200).json(results);
	} catch (error) {
		console.error('Error al obtener los productos:', error);
		res.status(500).json({ error: 'Error al obtener los productos.' });
	}
}

async function getProductById(req, res) {
	try {
		const productId = req.params.id;
		const sql = 'SELECT * FROM catalog_products WHERE id = ?';
		const results = await queryDatabase(sql, [productId]);
		if (results.length === 0) {
			res.status(404).json({ error: 'Producto no encontrado.' });
		} else {
			res.status(200).json(results[0]);
		}
	} catch (error) {
		console.error('Error al obtener el producto:', error);
		res.status(500).json({ error: 'Error al obtener el producto.' });
	}
}

async function createProduct(req, res) {
	try {
		const { name, description, height, length, width } = req.body;
		const sql = 'INSERT INTO catalog_products (name, description, height, length, width) VALUES (?, ?, ?, ?, ?)';
		const result = await queryDatabase(sql, [name, description, height, length, width]);
		res.status(201).json({ message: 'Producto creado exitosamente.', productId: result.insertId });
	} catch (error) {
		console.error('Error al crear el producto:', error);
		res.status(500).json({ error: 'Error al crear el producto.' });
	}
}

// Función asincrónica para editar un producto
async function updateProduct(req, res) {
	try {
		const productId = req.params.id;
		const { name, description, height, length, width } = req.body;
		const sql = 'UPDATE catalog_products SET name = ?, description = ?, height = ?, length = ?, width = ? WHERE id = ?';
		const result = await queryDatabase(sql, [name, description, height, length, width, productId]);
		if (result.affectedRows === 0) {
			res.status(404).json({ error: 'Producto no encontrado.' });
		} else {
			res.status(200).json({ message: 'Producto actualizado correctamente.' });
		}
	} catch (error) {
		console.error('Error al editar el producto:', error);
		res.status(500).json({ error: 'Error al editar el producto.' });
	}
}

// Función asincrónica para eliminar un producto
async function deleteProduct(req, res) {
	try {
		const productId = req.params.id;
		const sql = 'DELETE FROM catalog_products WHERE id = ?';
		const result = await queryDatabase(sql, [productId]);
		if (result.affectedRows === 0) {
			res.status(404).json({ error: 'Producto no encontrado.' });
		} else {
			res.status(200).json({ message: 'Producto eliminado correctamente.' });
		}
	} catch (error) {
		console.error('Error al eliminar el producto:', error);
		res.status(500).json({ error: 'Error al eliminar el producto.' });
	}
}


module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };

