const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;

router.get('/:id/:tipo/:entrega', async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo } = req.params;
        const { entrega } = req.params;
        var var_tipo = ""
        var var_entrega = ""

        if (tipo === "Todo")
            var_tipo = ""
        else
            var_tipo = tipo

        if (entrega === "Todo")
            var_entrega = ""
        else
            var_entrega = entrega


        if (id === "_ERROR_") {
            const x = await db
                .collection("ColPedidos")
                .find({ PedEstado: { $regex: var_tipo }, PedEntrega: { $regex: var_entrega } })
                .sort({ PedFecha: -1 })
                .toArray();

            let reg = x.length

            for (var i = 0; i < reg; i++) {
                const y = await db
                    .collection("ColUsuarios")
                    .find({ _id: new ObjectId(x[i].Cli_id) })
                    .toArray();

                if (y.length != 0) {
                    x[i].UsuNombre = y[0].UsuNombre + " " + y[0].UsuApellido
                    x[i].UsuCedula = y[0].UsuCedula
                }
            }


            res.send(x);
            //console.log(x)
        } else {
            const x = await db
                .collection("ColPedidos")
                .find({ _id: new ObjectId(id), PedEstado: { $regex: var_tipo }, PedEntrega: { $regex: var_entrega } })
                .sort({ PedFecha: -1 })
                .toArray();

            let reg = x.length

            for (var i = 0; i < reg; i++) {
                const y = await db
                    .collection("ColUsuarios")
                    .find({ _id: new ObjectId(x[i].Cli_id) })
                    .toArray();

                if (y.length != 0) {
                    x[i].UsuNombre = y[0].UsuNombre + " " + y[0].UsuApellido
                    x[i].UsuCedula = y[0].UsuCedula
                }
            }

            res.send(x);
            //console.log(x)
        }
    } catch (error) {
        res.json("Error en la API: /usuario");
    }

});


router.post('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const x = await db
            .collection("ColPedidos")
            .find({ _id: new ObjectId(id) })
            .sort({ PedFecha: -1 })
            .toArray();

        res.send(x);

    } catch (error) {
        res.json("Error en la API: /usuario");
    }

});


module.exports = router;