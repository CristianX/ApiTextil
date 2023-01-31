const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const { listAdminProductos } = require('../../utils/apiProductos');

router.get('/:nombre/:tipo/:color/:modelo', async (req, res) => {
    const { nombre } = req.params;
    const { tipo } = req.params;
    const { color } = req.params;
    const { modelo } = req.params;
    
    try {
        const resp = await listAdminProductos.getListAdminProductos(nombre, tipo, color, modelo);
        res.status(200);
        res.send(resp);
    } catch (error) {
        res.json("Error en la API: /listar productos");
    }


});


module.exports = router;