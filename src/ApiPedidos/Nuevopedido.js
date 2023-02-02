const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const { nuevoPedido } = require('../../utils/apiPedidos');

router.get('/', async (req, res) => {
    
    try {
        const resp = await nuevoPedido.getNuevoPedido();
        res.status(200);
        res.send(resp);
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});

router.post('/:producto', async (req, res) => {
    const { producto } = req.params;
    const {body = {}} = req;
    
    try {
        const resp = await nuevoPedido.postNuevoPedido(producto, body);
        res.status(201);
        res.send(resp);
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});



router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {body = {}} = req;

    try {
        const resp = await nuevoPedido.putNuevoPedido(id, body);
        res.status(200);
        res.json(resp);
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});



module.exports = router;