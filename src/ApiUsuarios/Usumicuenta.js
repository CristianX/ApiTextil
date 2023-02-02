const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
// const { encrypt, decrypt } = require('../ApiSeguridad/crypto')
const { Usumicuenta } = require('../../utils/apiUsuarios');

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const resp = await Usumicuenta.getUsumicuenta(id);
        res.status(200);
        res.send(resp);
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const resp = await Usumicuenta.deleteUsumicuenta(id);
        res.status(200);
        res.json('Se borro');
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {body = {}} = req;

    try {
        const resp = await Usumicuenta.putUsumicuenta(id, body);
        res.status(200);
        res.json('Se actualizó');
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});


router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const {body = {}} = req;

    try {
        const resp = await Usumicuenta.postUsumicuenta(id, body);
        res.status(200);
        res.json('Se actualizó');
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});


module.exports = router;