const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const { encrypt, decrypt } = require('../ApiSeguridad/crypto')
const apiUsuarios = require('../../utils/apiUsuarios');

router.get('/:nombre', async (req, res) => {
    const { nombre } = req.params;
    try {
        const resp = await apiUsuarios.getByNombre(nombre);
        res.status(200);
        res.send(resp);
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});

router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req.body;

    try {
        const resp = await apiUsuarios.postRespuestaById(id, body);
        res.status(201);
        res.json('Se agrego la respuesta');
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { RecTitulo, RecFecha, RecRespuesta } = req.body;

        var newvalues = { $pull: { "CliReclamos": { "RecTitulo": RecTitulo } } };
        const myquery = { _id: new ObjectId(id) };

        db.collection("ColUsuarios").update(myquery, newvalues, function (err, res) {
            if (err) throw err;
        });
        res.json("Se borro el reclamo")
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});


module.exports = router;