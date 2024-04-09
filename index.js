const express = require('express');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const authRoutes = require('./routes/authRoutes');
app.use('/users', authRoutes);

const productsRoutes = require('./routes/productsRoutes');
app.use('/', productsRoutes);


// Middleware para verificar el token JWT
// function verifyToken(req, res, next) {
// 	// Obtiene el token del encabezado de autorización
// 	const authHeader = req.headers['authorization'];

// 	// Verifica si el token existe
// 	if (!authHeader) {
// 		return res.status(401).json({ error: 'Token de autenticación no proporcionado.' });
// 	}

// 	if (authHeader && authHeader.startsWith('Bearer ')) {
// 		// Si el encabezado de autorización comienza con "Bearer ", extrae el token
// 		const token = authHeader.substring(7); // Ignorar los primeros 7 caracteres (Bearer )
// 		req.token = token; // Adjuntar el token al objeto de solicitud para su posterior uso

// 		try {
// 			// Verifica y decodifica el token
// 			const decoded = jwt.verify(token, 'tu_clave_secreta');

// 			// Adjunta el objeto decodificado del token a la solicitud para uso futuro
// 			req.user = decoded;
// 			connection.query('SELECT * FROM access_tokens WHERE token = ?', [token], (err, results) => {
// 				if (err) {
// 					console.error('Error al buscar usuario:', err);
// 					return res.status(500).json({ error: 'Error interno del servidor.' });
// 				}

// 				if (results.length === 0) {
// 					return res.status(401).json({ error: 'Token de autenticación inválido.' });
// 				}
// 			});

// 			// Continúa con la siguiente middleware o controlador de ruta
// 			next();
// 		} catch (err) {
// 			console.error('Error al verificar o decodificar el token:', err);
// 			return res.status(401).json({ error: 'Token de autenticación inválido.' });
// 		}
// 	} else {
// 		return res.status(401).json({ error: 'Formato de token de autenticación inválido.' });
// 	}
// }

// Ahora puedes aplicar este middleware a las rutas que desees proteger
// app.get('/ruta-protegida', verifyToken, (req, res) => {
// 	// El middleware verifyToken verifica y decodifica el token antes de permitir el acceso a esta ruta
// 	res.json({ mensaje: '¡Bienvenido a la ruta protegida!' });
// });

// app.get('/', (req, res) => {
// 	res.send('Hola server')
// });


app.listen(port, () => {
	console.log('mi port' + port)
});