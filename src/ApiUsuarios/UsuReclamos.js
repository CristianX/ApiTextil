const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const { UsuReclamos } = require('../../utils/apiUsuarios');

router.get('/:cliente', async (req, res) => {
    const { cliente } = req.params;

    try {
        const resp = await UsuReclamos.getUsuReclamos(cliente);
        res.status(200);
        res.send(resp);
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});

router.post('/:cliente', async (req, res) => {
    const { cliente } = req.params;
    const {body = {}} = req;

    try {
        const resp = await UsuReclamos.postUsuReclamos(cliente, body);
        res.status(201);
        res.json('Se agrego un reclamo');
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});



router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {body = {}} = req;

    try {
        const resp = await UsuReclamos.putUsuReclamos(id, body);
        res.status(200);
        res.json('El reclamo se actualizó');
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});



module.exports = router;