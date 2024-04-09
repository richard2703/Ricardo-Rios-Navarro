const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'tienda'
});

// Conectar a la base de datos
connection.connect((err) => {
	if (err) {
		console.error('Error al conectar a la base de datos:', err);
		return;
	}
	console.log('Conexión a la base de datos establecida correctamente.');
});


///////////////////////////////////////////////////////
// Endpoint para registrar un nuevo usuario
app.post('/register', (req, res) => {
	const { name, pass } = req.body;

	console.log(req.body);
	if (!name || !pass) {
		return res.status(400).json({ error: 'Nombre de usuario y contraseña son requeridos.' });
	}

	// Hashear la contraseña antes de almacenarla en la base de datos
	bcrypt.hash(pass, 10, (err, hashedPass) => {
		if (err) {
			console.error('Error al hashear contraseña:', err);
			return res.status(500).json({ error: 'Error interno del servidor.' });
		}

		// Insertar el nuevo usuario en la base de datos
		connection.query('INSERT INTO users (name, password) VALUES (?, ?)', [name, hashedPass], (err, result) => {
			if (err) {
				console.error('Error al registrar usuario:', err);
				return res.status(500).json({ error: 'Error interno del servidor.' });
			}

			// Devolver el ID del nuevo usuario creado
			res.status(201).json({ id: result.insertId, name });
		});
	});
});

app.get('/', (req, res) => {
	res.send('Hola server')
});

app.get('/products', (req, res) => {
	res.json([
		{
			name: 'String',
			description: 'String',
			height: 'Number',
			length: 'Number',
			width: 'Number'
		}, {
			name: 'String2',
			description: 'String',
			height: 'Number',
			length: 'Number',
			width: 'Number'
		}
	]);
});

app.get('/products/:id', (req, res) => {
	const { id } = req.params;
	res.json({
		id: id,
		name: 'String',
		description: 'String',
		height: 'Number',
		length: 'Number',
		width: 'Number'
	});
});

app.post('/products/:id', (req, res) => {
	const { id } = req.params;
	res.json({
		id: id,
		name: 'String',
		description: 'String',
		height: 'Number',
		length: 'Number',
		width: 'Number'
	});
});

app.put('/products/:id', (req, res) => {
	const { id } = req.params;
	res.json({
		id: id,
		name: 'String',
		description: 'String',
		height: 'Number',
		length: 'Number',
		width: 'Number'
	});
});

app.delete('/products/:id', (req, res) => {
	const { id } = req.params;
	res.json({
		id: id,
		name: 'String',
		description: 'String',
		height: 'Number',
		length: 'Number',
		width: 'Number'
	});
});

app.listen(port, () => {
	console.log('mi port' + port)
});