const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const { adminPedidos } = require('../../utils/apiPedidos');

router.get('/:id/:tipo/:entrega', async (req, res) => {

    const { id } = req.params;
    const { tipo } = req.params;
    const { entrega } = req.params;

    try {
        const resp = await adminPedidos.getAdminPedido(id, tipo, entrega);
        res.status(200);
        res.send(resp);
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});


router.post('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const resp = await adminPedidos.postAdminPedido(id);
        res.status(201);
        res.send(resp);
    } catch (error) {
        res.json("Error en la API: /usuario");
    }

});


module.exports = router;