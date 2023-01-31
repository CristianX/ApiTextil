const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
var nodemailer = require('nodemailer');
// const { encrypt, decrypt } = require('../ApiSeguridad/crypto')
const { UsuVerificacion } = require('../../utils/apiUsuarios');

router.get('/:correo', async (req, res) => {
    const { correo } = req.params;

    try {
        const resp = await UsuVerificacion.getUsuVerificacion(correo);
        res.status(200);
        res.send(resp);
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});

router.post('/:correo', async (req, res) => {
    const { correo } = req.params;

    try {
        const resp = await UsuVerificacion.postUsuVerificacion(correo);
        res.status(200);
        res.json('La contraseña se ha enviado al correo registrado');
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});

module.exports = router;