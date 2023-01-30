const express = require('express');
const morgan = require('morgan');
const app = express();
var cors = require("cors");
const database = require("../modulos/dbconect")

// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// PRUEBAS
//app.use(require('./routes'));
app.use('/usu', require('./routes/insertar'));
app.use('/prueba', require('./routes/prueba'));

app.use('/apifactura', require('./ApiPedidos/Factura'))

//SEGURIDADES
app.use('/encryp', require('./ApiSeguridad/encrip'));
app.use('/apirecuperar', require('./ApiSeguridad/recuperar'));
//app.use('/cripto', require('./ApiSeguridad/encrip'));

//USUARIOS
app.use('/apiusuario', require('./ApiUsuarios/Crudusuarios'));
app.use('/apiusumicuenta', require('./ApiUsuarios/Usumicuenta'));
app.use('/apinuevopedido', require('./ApiPedidos/Nuevopedido'));
app.use('/apiclicarrito', require('./ApiPedidos/Clicarrito'));
app.use('/apiusureclamo', require('./ApiUsuarios/UsuReclamos'));
app.use('/apiregistro', require('./ApiUsuarios/registro'));
app.use('/apiverpedidos', require('./ApiPedidos/Clipedido'));
app.use('/apiinfopedido', require('./ApiPedidos/Cliinfopedido'));
app.use('/users', require('./routes/usuario'));
app.use('/apiverificacion', require('./ApiUsuarios/UsuVerificacion'));

//ADMINISTRADOR
app.use('/apiproductos', require('./ApiProductos/Crudproductos'));
app.use('/apipedidos', require('./ApiPedidos/Crudpedidos'));
app.use('/apilistpedidos', require('./ApiProductos/Listproductos')); //ApiListPedidos hace referencia a productos
app.use('/apilistadminproductos', require('./ApiProductos/ListAdminProductos'));
app.use('/apiunproducto', require('./ApiProductos/Unproducto'));
app.use('/apiadminproducto', require('./ApiPedidos/Adminpedido')); //ApiAdminProducto hace referencia a pedidos
app.use('/apiadminclientes', require('./ApiUsuarios/AdminClientes'));
app.use('/apiadminreclamos', require('./ApiUsuarios/AdminReclamos'));
app.use('/apiconteo', require('./Admincontador'));
app.use('/capuchino', require('./ApiProductos/Adminimagen'));


// starting the serve
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});