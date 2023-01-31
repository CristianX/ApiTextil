const axios = require('axios');
const { response } = require('express');

const adminImagen = {
    async getAdminImagen(img) {
        try {
            return await axios.get(`http://localhost:3003/capuchino/${img}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },


};

const crudProductos = {
    async getCrudProductos() {
        try {
            return await axios.get(`http://localhost:3003/apiproductos`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async postCrudProductos(body) {
        try {
            return await axios.post(`http://localhost:3003/apiproductos`, body).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async deleteCrudProductos(id) {
        try {
            return await axios.delete(`http://localhost:3003/apiproductos/${id}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async putCrudProductos(id, body) {
        try {
            return await axios.put(`http://localhost:3003/apiproductos/${id}`, body).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    }
};

const listAdminProductos = {
    async getListAdminProductos(nombre, tipo, color, modelo) {
        try {
            return await axios.get(`http://localhost:3003/apilistadminproductos/${nombre}/${tipo}/${color}/${modelo}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    }
};

const listProductos = {
    async getListProductos(nombre, tipo, color, modelo) {
        try {
            return await axios.get(`http://localhost:3003/apilistpedidos/${nombre}/${tipo}/${color}/${modelo}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },
};

const unProducto = {
    async getUnProducto(id) {
        try {
            return await axios.get(`http://localhost:3003/apiunproducto/${id}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async putUnProducto(id, body) {
        try {
            return await axios.put(`http://localhost:3003/apiunproducto/${id}`, body).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },
};

module.exports = {adminImagen, crudProductos, listAdminProductos, listProductos, unProducto};