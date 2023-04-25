const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
var nodemailer = require('nodemailer');
const { encrypt, decrypt } = require('../ApiSeguridad/crypto');
const { apiSeguridad } = require('../../utils/apiSeguridad');

router.get('/:codigo', async (req, res) => {
   const { codigo } = req.params;

   try {
    const resp = await apiSeguridad.getRecuperar(codigo);
    res.status(200);
    res.send(resp);
   } catch (error) {
    res.json("Error en la API: /usuario");
   }
});

router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const { body = {} } = req;

   try {
    const resp = await apiSeguridad.postRecuperar(id, body);
    res.status(201);
    res.json(resp);
   } catch (error) {
    res.json("Error en la API: /usuario");
   }
});


router.put('/:correo/:codigo', async (req, res) => {
    const { correo, codigo } = req.params;

   try {
    const resp = await apiSeguridad.putRecuperar(correo, codigo);
    res.status(200);
    res.json(resp);
   } catch (error) {
    res.json("Error en la API: /usuario");
   }

});

router.put('/newpass/:correo/:pass', async (req, res) => {

   const { correo, pass } = req.params;

   try {
      const resp = await apiSeguridad.putNuevoPass(correo, pass);
      res.status(200);
      res.json(resp);
   } catch (error) {
      res.json("Error en la API: /usuario");
   }

});

router.get('/codigo-recuperacion/:correo/:codigo', async (req, res) => {
   const { correo, codigo } = req.params;

   try {
      const resp = await apiSeguridad.getCompararCodigo(correo, codigo);
      res.status(200);
      res.json(resp);
   } catch (error) {
      res.json("Error en la API: /usuario");
   }
});

module.exports = router;