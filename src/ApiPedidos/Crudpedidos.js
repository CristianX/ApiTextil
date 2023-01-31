const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const { crudPedidos } = require('../../utils/apiPedidos');

router.get('/', async (req, res) => {
   
    try {
        const resp = await crudPedidos.getCrudPedidos();
        res.status(200);
        res.send(resp);
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }

});


router.post('/', async (req, res) => {
    const { body } = req.body;

    try {
        const resp = await crudPedidos.postCrudPedidos(body);
        res.status(201);
        res.json(resp);
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const resp = await crudPedidos.deleteCrudPedidos(id);
        res.status(200);
        res.send(resp);
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req.body;

    try {
        const resp = await crudPedidos.putCrudPedidos(id, body);
        res.status(200);
        res.json(resp);
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});


//ELIMINAR UN CAMPO
/*router.put('/:id', (req, res) => {
    const { id } = req.params;

    var newvalues = {
        $unset: {
            PassNombre: "",
            PassApellido: "",
            PassDireccion: "",
            PassTelefono: "",
            PassEmail: "",
            PassPassword: "",
            PassRol: ""
        }
    };
    var myquery = { _id: new ObjectId(id) };
    db.collection("ColUsuarios").updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("se actualizó");
    });
    res.json("se borro un campo");

});*/

module.exports = router;