const express = require('express');
let mysql = require("mysql");
const cors = require('cors');
const { json } = require('express');
const app = express();

app.use(cors()); 
app.use(express.json());
const puerto = process.env.PUERTO || 3000;
app.listen(puerto, function() {
    console.log("Servidor de Node levantado en el puerto " + puerto);
});

// Conexión a la base de datos
let conexion = mysql.createConnection({
    host: "localhost",
    database: "articulosdb",
    user: "root",
    password: "",
});

conexion.connect(function(err) {
    if (err) {
        throw err;
        conexion.end();
    } else {
        console.log("Conexión exitosa a la base de datos");
    }
});

// Ruta para el index
app.get('/', function(req, res) {
    res.send('RUTA INDEX DONDE SE MUESTRA LA INFO DE ARTICULOS');
});

// Mostrar todos los artículos
app.get('/api/articulos', (req, res) => {
    conexion.query('SELECT * FROM articulos', (error, filas) => {
        if (error) {
            throw error;
        } else {
            res.send(filas);
            console.log(filas);
        }
    });
});

// Mostrar un solo artículo
app.get('/api/articulos/:id', (req, res) => {
    conexion.query('SELECT * FROM articulos WHERE id = ?', [req.params.id], (error, filas) => {
        if (error) {
            throw error;
        } else {
            res.send(filas);
            console.log(filas);
        }
    });
});

// Crear un artículo
app.post('/api/articulos', (req, res) => {
    let data = { descripcion: req.body.descripcion, precio: req.body.precio, stock: req.body.stock };
    let sql = "INSERT INTO articulos SET ?";
    conexion.query(sql, data, function(err, result) {
        if (err) {
            throw err;
        } else {
            Object.assign(data, { id: result.insertId });
            res.send(data);
        }
    });
});

// Editar un artículo
app.put('/api/articulos/:id', (req, res) => {
    let id = req.params.id;
    let { descripcion, precio, stock } = req.body;
    let sql = "UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?";
    conexion.query(sql, [descripcion, precio, stock, id], function(error, result) {
        if (error) {
            throw error;
        } else {
            res.send(result);
        }
    });
});

// Eliminar artículo
app.delete('/api/articulos/:id', (req, res) => {
    conexion.query('DELETE FROM articulos WHERE id = ?', [req.params.id], function(error, filas) {
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    });
});
