const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { queryDatabase } = require('../data/database');

router.post('/register', (req, res) => {
	const { name, pass } = req.body;

	if (!name || !pass) {
		return res.status(400).json({ error: 'Nombre de usuario y contraseña son requeridos.' });
	}

	// Hashear la contraseña antes de almacenarla en la base de datos
	bcrypt.hash(pass, 10, (err, hashedPass) => {
		if (err) {
			console.error('Error al hashear contraseña:', err);
			return res.status(500).json({ error: 'Error interno del servidor.' });
		}

		const sql = 'INSERT INTO users (name, pass) VALUES (?, ?)';
		queryDatabase(sql, [name, hashedPass], (err, result) => {
			if (err) {
				console.error('Error al ejecutar la consulta:', err);
				return;
			}
			res.status(201).json({ id: result.insertId, name });
		});

	});
});

// Función para generar un token JWT con una duración de 1 hora
function generateToken(user) {
	// Define los datos que quieres incluir en el token (por ejemplo, el ID de usuario)
	const payload = {
		userId: user.id,
		// Puedes incluir más datos aquí según tus necesidades
	};

	// Genera el token JWT con el payload, la clave secreta y la configuración de expiración
	const token = jwt.sign(payload, 'tu_clave_secreta', { expiresIn: '1h' });

	return token;
}

// Endpoint para iniciar sesión
router.post('/login', (req, res) => {
	const { name, pass } = req.body;
	console.log(name, pass);
	if (!name || !pass) {
		return res.status(400).json({ error: 'Nombre de usuario y contraseña son requeridos.' });
	}

	const sql = 'SELECT * FROM users WHERE name = ?';
	queryDatabase(sql, [name], (err, results) => {
		if (err) {
			console.error('Error al buscar usuario:', err);
			return res.status(500).json({ error: 'Error interno del servidor.' });
		}

		if (results.length === 0) {
			return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos.' });
		}

		const user = results[0];

		// Verificar la contraseña hasheada
		bcrypt.compare(pass, user.pass, (err, isMatch) => {
			if (err) {
				console.error('Error al comparar contraseñas:', err);
				return res.status(500).json({ error: 'Error interno del servidor.' });
			}

			if (!isMatch) {
				return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos.' });
			}

			const token = generateToken(user); // Implementa esta función según tus necesidades
			console.log('Token generado:', token);

			// Guardar el token en la base de datos
			const sql = 'INSERT INTO access_tokens (user_id, token) VALUES (?, ?)';
			queryDatabase(sql, [user.id, token], (err, result) => {
				if (err) {
					console.error('Error al guardar token:', err);
					return res.status(500).json({ error: 'Error interno del servidor.' });
				}
				res.json({ token });
			});
		});
	});


});


module.exports = router;
