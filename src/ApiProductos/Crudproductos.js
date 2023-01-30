const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }).single("file");
const fs = require("fs");

router.get('/', async (req, res) => {
    try {
        const x = await db
            .collection("ColProductos")
            .find({})
            .toArray();
        res.send(x);
    } catch (error) {
        res.json("Error en la API: /producto");
    }
});

router.post('/', (req, res) => {
    try {
        const newProducto = { ...req.body };
        db.collection('ColProductos').insertOne(newProducto);
        
        res.json("Se creo un nuevo producto");
    } catch (error) {
        res.json("Error en la API: /producto");
    }
});

router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            db.collection("ColProductos").deleteOne({ _id: new ObjectId(id) }, function (err, obj) {
                if (err) throw err;
                res.json("Se borro");
            });
        }
    } catch (error) {
        res.json("Error en la API: /producto");
    }
});

router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { ProNombre, ProDescripcion, ProPrecio, ProProveedor, ProStockInicial, ProFechaInicial, ProFechaFinal, ProEstado, ProStockActual, ProTipo, ProColor, ProModelo, ProPeso, ProDimension } = req.body;
        var newvalues = {
            $set: {
                ProNombre: ProNombre,
                ProDescripcion: ProDescripcion,
                ProPrecio: ProPrecio,
                ProProveedor: ProProveedor,
                ProStockInicial: ProStockInicial,
                ProFechaInicial: ProFechaInicial,
                ProFechaFinal: ProFechaFinal,
                ProEstado: ProEstado,
                ProStockActual: ProStockActual,
                ProTipo: ProTipo,
                ProColor: ProColor,
                ProModelo: ProModelo,
                ProPeso, ProPeso,
                ProDimension, ProDimension
            }
        };
        var myquery = { _id: new ObjectId(id) };
        db.collection("ColProductos").updateOne(myquery, newvalues, function (err, res) {
        });
        res.json("Se actualizó el producto");
    } catch (error) {
        res.json("Error en la API: /producto");
    }
});



module.exports = router;