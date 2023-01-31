const axios = require('axios');
const { response } = require('express');


const adminPedidos = {
    async getAdminPedido(id, tipo, entrega) {
        try {
            return await axios.get(`http://localhost:3003/apiadminproducto/${id}/${tipo}/${entrega}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async postAdminPedido(id) {
        try {
            return await axios.post(`http://localhost:3003/apiadminproducto/${id}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },
};

const cliCarrito = {
    async getCliCarrito(id) {
        try {
            return await axios.get(`http://localhost:3003/apiclicarrito/${id}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async postCliCarrito(cliente, body) {
        try {
            return await axios.post(`http://localhost:3003/apiclicarrito/${cliente}`, body).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async putCliCarrito(cliente, producto) {
        try {
            return await axios.put(`http://localhost:3003/apiclicarrito/${cliente}/${producto}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async deleteCliCarrito(body) {
        try {
            return await axios.delete(`http://localhost:3003/apiclicarrito`, { data: { body } }).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    }
};

const cliInfoPedidos = {
    async getCliInfoPedidos(id) {
        try {
            return await axios.get(`http://localhost:3003/apiinfopedido/${id}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },
};

const cliPedido = {
    async getCliPedido(id, tipo) {
        try {
            return await axios.get(`http://localhost:3003/apiverpedidos/${id}/${tipo}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },
};

const crudPedidos = {
    async getCrudPedidos() {
        try {
            return await axios.get(`http://localhost:3003/apipedidos/`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async postCrudPedidos(body) {
        try {
            return await axios.post(`http://localhost:3003/apipedidos/`, body).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async deleteCrudPedidos(id) {
        try {
            return await axios.delete(`http://localhost:3003/apipedidos/${id}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async putCrudPedidos(id, body) {
        try {
            return await axios.put(`http://localhost:3003/apipedidos/${id}`, body).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    }
};

const factura = {
    async getFactura(id) {
        try {
            return await axios.get(`http://localhost:3003/apifactura/${id}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async putFactura(id) {
        try {
            return await axios.put(`http://localhost:3003/apifactura/${id}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },
};

const nuevoPedido = {
    async getNuevoPedido() {
        try {
            return await axios.get(`http://localhost:3003/apinuevopedido/`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async postNuevoPedido(producto, body) {
        try {
            return await axios.post(`http://localhost:3003/apinuevopedido/${producto}`, body).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async putNuevoPedido(id, body) {
        try {
            return await axios.put(`http://localhost:3003/apinuevopedido/${id}`, body).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    }
};

module.exports = {adminPedidos, cliCarrito, cliInfoPedidos, cliPedido, crudPedidos, factura, nuevoPedido};