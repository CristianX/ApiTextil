const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const { crudUsuarios } = require('../../utils/apiUsuarios');

router.get('/', async (req, res) => {
    try {
        const resp = await crudUsuarios.getAll();
        res.status(200);
        res.send(resp);
    } catch (error) {
        es.json("Error en la API: /usuario");
    }
});

router.post('/', async (req, res) => {
    const body = {...req.body};

    try {
        const resp = await crudUsuarios.postUsuario(body);
        res.status(201);
        res.json(resp);
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const resp = await crudUsuarios.deleteUsuario(id);
        res.status(200);
        res.send('Se borro');
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});

//ELIMINAR UN CAMPO
router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const resp = await crudUsuarios.putUsuario(id);
        res.status(200);
        res.send('se borro un campo');
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});

module.exports = router;