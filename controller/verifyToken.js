const express = require('express');
const { queryDatabase } = require('../data/database');
const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
	// Obtiene el token del encabezado de autorización
	const authHeader = req.headers['authorization'];

	// Verifica si el token existe
	if (!authHeader) {
		return res.status(401).json({ error: 'Token de autenticación no proporcionado.' });
	}

	if (authHeader && authHeader.startsWith('Bearer ')) {
		// Si el encabezado de autorización comienza con "Bearer ", extrae el token
		const token = authHeader.substring(7); // Ignorar los primeros 7 caracteres (Bearer )
		req.token = token; // Adjuntar el token al objeto de solicitud para su posterior uso

		try {
			// Verifica y decodifica el token
			const decoded = jwt.verify(token, 'KeyEnv');

			req.user = decoded;
			const sql = 'SELECT * FROM access_tokens WHERE token = ?';
			queryDatabase(sql, [token], (err, result) => {
				if (err) {
					console.error('Error al buscar usuario:', err);
					return res.status(500).json({ error: 'Error interno del servidor.' });
				}
				if (results.length === 0) {
					return res.status(401).json({ error: 'Token de autenticación inválido.' });
				}
			});

			next();
		} catch (err) {
			console.error('Error al verificar o decodificar el token:', err);
			return res.status(401).json({ error: 'Token de autenticación inválido.' });
		}
	} else {
		return res.status(401).json({ error: 'Formato de token de autenticación inválido.' });
	}
}

module.exports = { verifyToken };
