const express = require('express');
const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'tienda'
});

// Función para conectar a la base de datos
function connectDatabase() {
	connection.connect((err) => {
		if (err) {
			console.error('Error al conectar a la base de datos:', err);
			return;
		}
		console.log('Conexión a la base de datos establecida correctamente.');
	});
}

// Función para realizar consultas SQL genéricas
function queryDatabase(sql, values) {
	return new Promise((resolve, reject) => {
		connection.query(sql, values, (err, results) => {
			if (err) {
				console.error('Error al ejecutar la consulta:', err);
				reject(err);
				return;
			}
			resolve(results);
		});
	});
}


// Exporta las funciones de conexión y consulta para su uso en otros archivos
module.exports = { connectDatabase, queryDatabase };