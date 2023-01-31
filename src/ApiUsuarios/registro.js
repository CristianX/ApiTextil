const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
// const { encrypt, decrypt } = require('../ApiSeguridad/crypto')
const { registro } = require('../../utils/apiUsuarios');

router.get('/:correo/:pass/:rol', async (req, res) => {
    const { correo } = req.params;
    const { pass } = req.params;
    const { rol } = req.params;

    try {
        const resp = await registro.getRegistro(correo, pass, rol);
        res.status(200);
        res.json(resp);
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});

router.post('/', async (req, res) => {

    const { body } = req.body;

    try {
        const resp = await registro.postRegistro(body);
        res.status(201);
        res.json('Se inserto con éxito');
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const resp = await registro.deleteRegistro(id);
        res.status(200);
        res.json('Se borro su cuenta');
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const resp = await registro.putRegistro(id);
        res.status(200);
        res.json('Se actualizó con éxito al usuario');
    } catch (error) {
        res.json("Error en la API: /usuario");
        response.status(500).json({ message: "Error en la API: /usuario" });
    }
});

module.exports = router;