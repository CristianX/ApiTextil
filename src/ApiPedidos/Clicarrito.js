const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const Stripe = require("stripe");
var nodemailer = require('nodemailer');
const stripe = new Stripe("sk_test_51LjnQpCIHv9lbd1Z6XPNS1GVDCqzXaZxJGgWYQHFvc4xHXrp4HdNjliTmfRqL7YZ5QxqrCvq8iQv01N2oehbPcse0052gvFFL7");
const { encrypt, decrypt } = require('../ApiSeguridad/crypto')

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const x = await db
            .collection("ColPedidos")
            .find({ PedEstado: "inicial", Cli_id: id })
            .toArray();
        res.send(x);
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});

router.post('/:cliente', async (req, res) => {

    try {
        const { cliente } = req.params;

        const { PedTotal, PedEntrega, PedUbic, PedSubTotal, PedIva } = req.body;

        var myquery = { PedEstado: "inicial", Cli_id: cliente };

        const x = await db
            .collection("ColUsuarios")
            .find({ _id: new ObjectId(cliente) })
            .toArray();
        
        correo_encrypt = decrypt(x[0]['UsuEmail'])

        //Aqui VA

        var texto_men = "<h2> DETALLE DEL PEDIDO </h2> <br /> <br />" 
        texto_men += "Tipo de entrega: " +  PedEntrega + "<br /><br />"
        texto_men += "Lugar de Entrega: " + PedUbic + "<br /><br />"
        texto_men += "SubTotal: " + "$" + PedSubTotal + "<br />"
        texto_men += "IVA:  " + "$" + PedIva + "<br />"
        texto_men += "Total:  " + "$" + PedTotal + "<br /><br />"
        texto_men += " ¡Gracias por su compra! "



        var transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'daed_sa@hotmail.com',
                pass: 'L4nnister'
            }
        });

        var mailOptions = {
            from: 'daed_sa@hotmail.com',
            to: correo_encrypt,
            subject: 'Recuperacion de contraseña DANITEX',
            html: texto_men
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.json("La contraseña se ha enviado al correo registrado");
            }
        });

        

        /*
        var cli_ubicacion = ""
        x.map((a, b) => (
            cli_ubicacion = a.UsuDireccion
        )
        )*/



        const y = await db
            .collection("ColPedidos")
            .find(myquery)
            .toArray();

        var registros = y[0].PedLisProductos.length

        for (var i = 0; i < registros; i++) {
            const z = await db.collection("ColProductos").find({ _id: new ObjectId(y[0].PedLisProductos[i].Pro_id) }).toArray();

            var resta = parseFloat(z[0].ProStockActual) - parseFloat(y[0].PedLisProductos[i].ProCantidad)
            var estado = "Disponible"

            if (resta < 5)
                estado = "Adquirir"

            if (resta <= 0)
                estado = "No Disponible"

            var newvalues2 = { $set: { ProStockActual: resta, ProEstado: estado} };

            db.collection("ColProductos").updateOne({ _id: new ObjectId(y[0].PedLisProductos[i].Pro_id) }, newvalues2)
        }

        var newvalues = {
            $set: {
                PedDescuento: "0",
                PedTotal: PedTotal,
                PedTransaccion: "En Transaccion",
                PedEntrega: PedEntrega,
                PedUbicacion: PedUbic,
                PedEstado: "Proceso de pago",
                PedSubTotal: PedSubTotal, 
                PedIva: PedIva
            }
        };

        db.collection("ColPedidos").updateOne(myquery, newvalues)

        
        res.json("Se ha realizado su compra con éxito !! ");
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});

router.put('/:cliente/:producto', async (req, res) => {
    try {
        const { producto } = req.params;
        const { cliente } = req.params;

        var myquery = { PedEstado: "inicial", Cli_id: cliente };
        var newvalues = { $pull: { "PedLisProductos": { "Pro_id": producto } } };

        const x = await db
            .collection("ColPedidos")
            .find(myquery)
            .toArray();

        var num_productos = ""
        x.map((a, b) => (
            num_productos = a.PedLisProductos.length
        )
        )

        console.log(num_productos)

        if (num_productos === 1) {
            db.collection("ColPedidos").deleteOne(myquery, function (err, obj) {
                if (err) throw err;
                res.json("Ya no hay productos en el pedido")
            });
        }
        else {

            db.collection("ColPedidos").update(myquery, newvalues, function (err, res) {
                if (err) throw err;
            });
            res.json("Se borro un producto")
        }
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});


router.delete('/', async (req, res) => {
    const { id, amount } = req.body;

    //console.log(amount, " ", id)
    //res.json("ok");
    try {
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "USD",
            description: "DANiTEX importadora",
            payment_method: id.id,
            confirm: true, //confirm the payment at the same time
        });

        //console.log(payment);
        console.log("Successful Payment")

        res.json("ok");
    } catch (error) {
        //console.log(error);
        res.json({ message: error.raw.message });
    }

});

module.exports = router;