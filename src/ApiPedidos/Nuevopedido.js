const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;

router.get('/', async (req, res) => {
    try {
        const x = await db
            .collection("ColPedidos")
            .find({ PedEstado: "inicial" })
            .toArray();

        res.send(x);
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});

router.post('/:producto', async (req, res) => {
    try {
        const { producto } = req.params;

        const { Cli_id, PedFecha, PedEstado, ProNombre, ProPrecio, ProCantidad, ProImagen, ProStock } = req.body;
        const newPedido = { ...req.body };

        const x = await db
            .collection("ColPedidos")
            .find({ PedEstado: "inicial", Cli_id: Cli_id })
            .toArray();


        if (x.length === 0) {
            db.collection('ColPedidos').insertOne({ Cli_id: Cli_id, PedFecha: PedFecha, PedEstado: PedEstado });
            db.collection('ColPedidos').updateOne({ PedEstado: "inicial", Cli_id: Cli_id }, { $push: { PedLisProductos: { $each: [{ Pro_id: producto, ProNombre: ProNombre, ProPrecio: ProPrecio, ProCantidad: ProCantidad, ProImagen: ProImagen }] } } })
            res.send("Se guardo un nuevo producto al carrito");
        }
        else {

            const y = await db
                .collection("ColPedidos")
                .find({ PedEstado: "inicial", Cli_id: Cli_id, "PedLisProductos.Pro_id": producto })
                .toArray();

            if (y.length === 0) {
                db.collection('ColPedidos').updateOne({ PedEstado: "inicial", Cli_id: Cli_id }, { $push: { PedLisProductos: { $each: [{ Pro_id: producto, ProNombre: ProNombre, ProPrecio: ProPrecio, ProCantidad: ProCantidad, ProImagen: ProImagen }] } } })
                res.send("Se guardo un nuevo producto al carrito");
            } else {

                let nuevo_pro = 0
                //console.log("TOTAL: " + y[0].PedLisProductos.length)

                let reg = y[0].PedLisProductos.length

                for (var i = 0; i < reg; i++)
                    if (y[0].PedLisProductos[i].Pro_id === producto)
                        nuevo_pro = ProCantidad + y[0].PedLisProductos[i].ProCantidad


                if (nuevo_pro > ProStock)
                    res.send("La cantidad ya esta agregada en su carrito !");
                else {
                    db.collection('ColPedidos').updateOne({ PedEstado: "inicial", Cli_id: Cli_id, "PedLisProductos.Pro_id": producto }, { $set: { "PedLisProductos.$.ProCantidad": nuevo_pro } })
                    res.send("Se guardo un nuevo producto al carrito");
                }
            }

        }

    } catch (error) {
        console.log(error)
        res.json("Error en la API: /pedidos");
    }
});



router.put('/:id', (req, res) => {
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
});



module.exports = router;