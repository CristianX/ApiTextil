const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const { unProducto } = require('../../utils/apiProductos');

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const resp = await unProducto.getUnProducto(id);
        res.status(200);
        res.send(resp);
    } catch (error) {
        res.json("Error en la API: /producto");
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {body = {}} = req;

    try {
        const resp = await unProducto.putUnProducto(id, body);
        res.status(200);
        res.json(resp);
    } catch (error) {
        res.json("Error en la API: /producto");
    }
});


module.exports = router;