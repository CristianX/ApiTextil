const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const { cliPedido } = require('../../utils/apiPedidos');

router.get('/:id/:tipo', async (req, res) => {
    const { id } = req.params;
    const { tipo } = req.params;
   
    try {
        const resp = await cliPedido.getCliPedido(id, tipo);
        res.status(200);
        res.send(resp);
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }

});

module.exports = router;