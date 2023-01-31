const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
// const { encrypt, decrypt } = require('../ApiSeguridad/crypto')
const {adminReclamos} = require('../../utils/apiUsuarios');

router.get('/:nombre', async (req, res) => {
    const { nombre } = req.params;
    try {
        const resp = await adminReclamos.getByNombre(nombre);
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
        const resp = await adminReclamos.postReclamoById(id, body);
        res.status(201);
        res.json('Reclamo Actualizado');
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req.body;

    try {
        const resp = await adminClientes.putBorrarReclamo(id, body);
        res.status(200);
        res.json('Se eliminó el reclamo');
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});


module.exports = router;