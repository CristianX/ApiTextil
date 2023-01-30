const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;

router.get('/', async (req, res) => {
    try {
        const x = await db
            .collection("ColPedidos")
            .find({})
            .toArray();
        res.send(x);
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});


router.post('/', (req, res) => {
    try {
        const { CliCedula, PedFecha, PedEstado } = req.body;
        const newPedido = { ...req.body };
        if (CliCedula && PedFecha && PedEstado) {
            db.collection('ColPedidos').insertOne(newPedido);
            res.json("Se insertó con exito");
        } else {
            res.status(500).json({ error: 'There was an error.' });
        }
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});

router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            db.collection("ColPedidos").deleteOne({ _id: new ObjectId(id) }, function (err, obj) {
                if (err) throw err;
                res.send("Se borro");
            });
        }
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});

router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { CliCedula, PedFecha, PedEstado, PedLisProductos, PedFechaFac, PedDescuento, Pedsubtotal, PedTotal, PedTrasaccion, PedEstEntrega, PedUbicacion, ProEstado } = req.body;
        if (CliCedula && PedFecha && PedEstado) {
            var newvalues = {
                $set: {
                    CliCedula: CliCedula,
                    PedFecha: PedFecha,
                    ProEstado: PedEstado,
                    PedLisProductos: PedLisProductos,
                    PedFechaFac: PedFechaFac,
                    PedDescuento: PedDescuento,
                    Pedsubtotal: Pedsubtotal,
                    PedTotal: PedTotal,
                    PedTrasaccion: PedTrasaccion,
                    PedEstEntrega: PedEstEntrega,
                    PedUbicacion: PedUbicacion,
                    ProEstado: ProEstado
                }
            };
            var myquery = { _id: new ObjectId(id) };
            db.collection("ColPedidos").updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                console.log("se actualizó");
            });
            res.json("se actualizó");
        } else {
            res.status(500).json({ error: 'There was an error.' });
        }
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