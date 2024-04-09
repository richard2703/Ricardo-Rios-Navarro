const express = require('express');
const { queryDatabase } = require('../data/database');
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');

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
		await Promise.all([
			body('name').notEmpty().trim().escape().isString().withMessage('El nombre es obligatorio y debe ser una cadena de texto').run(req),
			body('description').notEmpty().trim().escape().isString().withMessage('La descripción es obligatoria y debe ser una cadena de texto').run(req),
			body('height').notEmpty().isNumeric().withMessage('La altura es obligatoria y debe ser un número').run(req),
			body('length').notEmpty().isNumeric().withMessage('La longitud es obligatoria y debe ser un número').run(req),
			body('width').notEmpty().isNumeric().withMessage('El ancho es obligatorio y debe ser un número').run(req)
		]);

		// Verificar si hay errores de validación
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, description, height, length, width } = req.body;
		const sql = 'INSERT INTO catalog_products (name, description, height, length, width) VALUES (?, ?, ?, ?, ?)';
		const result = await queryDatabase(sql, [name, description, height, length, width]);
		res.status(201).json({ message: 'Producto creado exitosamente.', productId: result.insertId });
	} catch (error) {
		console.error('Error al crear el producto:', error);
		res.status(500).json({ error: 'Error al crear el producto.' });
	}
}

async function updateProduct(req, res) {
	try {
		await Promise.all([
			body('name').notEmpty().trim().escape().isString().withMessage('El nombre es obligatorio y debe ser una cadena de texto').run(req),
			body('description').notEmpty().trim().escape().isString().withMessage('La descripción es obligatoria y debe ser una cadena de texto').run(req),
			body('height').notEmpty().isNumeric().withMessage('La altura es obligatoria y debe ser un número').run(req),
			body('length').notEmpty().isNumeric().withMessage('La longitud es obligatoria y debe ser un número').run(req),
			body('width').notEmpty().isNumeric().withMessage('El ancho es obligatorio y debe ser un número').run(req)
		]);

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

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

