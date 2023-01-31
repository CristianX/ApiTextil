const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const { cliInfoPedidos } = require('../../utils/apiPedidos');

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const resp = await cliInfoPedidos.getCliInfoPedidos(id);
        res.status(200);
        res.send(resp);
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }

});

module.exports = router;