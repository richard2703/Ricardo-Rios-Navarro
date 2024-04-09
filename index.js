const express = require('express');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const authRoutes = require('./routes/authRoutes');
app.use('/users', authRoutes);

const productsRoutes = require('./routes/productsRoutes');
app.use('/', productsRoutes);


app.listen(port, () => {
	console.log('mi port' + port)
});