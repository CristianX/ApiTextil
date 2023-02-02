const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }).single("file");
const fs = require("fs");
const { crudProductos } = require('../../utils/apiProductos');

router.get('/', async (req, res) => {
    try {
        const resp = await crudProductos.getCrudProductos();
        res.status(200);
        res.send(resp);
    } catch (error) {
        res.json("Error en la API: /producto");
    }
});

router.post('/', async (req, res) => {
    const {body = {}} = req;

    try {
        const resp = await crudProductos.postCrudProductos(body);
        res.status(200);
        res.json(resp);
    } catch (error) {
        res.json("Error en la API: /producto");
    }
});

router.delete('/:id', async (req, res) => {
    const {body = {}} = req;
    
    try {
        const resp = await crudProductos.deleteCrudProductos(id);
        res.status(200);
        res.json(resp);
    } catch (error) {
        res.json("Error en la API: /producto");
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {body = {}} = req;

    try {
        const resp = await crudProductos.putCrudProductos(id, body);
        res.status(200);
        res.json(resp);
    } catch (error) {
        res.json("Error en la API: /producto");
    }
});



module.exports = router;