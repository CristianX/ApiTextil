const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const Stripe = require("stripe");
var nodemailer = require('nodemailer');
const stripe = new Stripe("sk_test_51LjnQpCIHv9lbd1Z6XPNS1GVDCqzXaZxJGgWYQHFvc4xHXrp4HdNjliTmfRqL7YZ5QxqrCvq8iQv01N2oehbPcse0052gvFFL7");
// const { encrypt, decrypt } = require('../ApiSeguridad/crypto')
const { cliCarrito } = require('../../utils/apiPedidos');

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const resp = await cliCarrito.getCliCarrito(id);
        res.status(200);
        res.send(resp);
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});

router.post('/:cliente', async (req, res) => {

    const { cliente } = req.params;
    const { body } = req.body;
    
    try {
        const resp = await cliCarrito.postCliCarrito(cliente, body);
        res.status(201);
        res.json(resp);
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});

router.put('/:cliente/:producto', async (req, res) => {
    const { cliente } = req.params;
    const { producto } = req.params;
   
    try {
        const resp = await cliCarrito.putCliCarrito(cliente, producto);
        res.status(200);
        res.json(resp);
    } catch (error) {
        res.json("Error en la API: /pedidos");
    }
});


router.delete('/', async (req, res) => {
    const { body } = req.body;
try {
    const resp = await cliCarrito.deleteCliCarrito(body);
    res.status(200);
    res.json(resp);
} catch (error) {
    res.json({ message: error.raw.message });
}

});

module.exports = router;