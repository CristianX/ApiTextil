const { Router } = require('express');
const router = new Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }).single("file");
const fs = require("fs");
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    res.sendFile(process.cwd() + '/facturas/'+ id +'.pdf');
});

router.post('/', (req, res) => {
    try {
        upload(req, res, (err) => {
            if (err) {
                res.status(400).json("Error al subir la factura!");
            }

            const { name } = req.body;

            const tempPath = req.file.path;
            const targetPath = (process.cwd() + '/facturas/' + name + '.pdf');

            fs.rename(tempPath, targetPath, err => {

                var newvalues2 = { $set: { PedEstado: "Finalizado"} };
                db.collection("ColPedidos").updateOne({ _id: new ObjectId(name) }, newvalues2)

                res.send("Se ha subido la factura")
            });

        });
    } catch (error) {
        res.json("Error en la API: /insertar imagen");
    }
});

router.put('/:id', (req, res) => {
    try {

        const { id } = req.params;
        var newvalues2 = { $set: { PedEntrega: "Entregado"} };
        db.collection("ColPedidos").updateOne({ _id: new ObjectId(id) }, newvalues2)

        res.json("Se ha actualizado la entrega")

    } catch (error) {
        res.json("Error en la API: cambio de estado" + error);
    }
});

module.exports = router;