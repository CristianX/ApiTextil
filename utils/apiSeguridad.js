const axios = require('axios');
const { response } = require('express');

const apiSeguridad = {
    async getRecuperar(codigo) {
        try {
            return await axios.get(`http://localhost:3001/apirecuperar/${codigo}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async postRecuperar(id, body) {
        try {
            return await axios.post(`http://localhost:3001/apirecuperar/${id}`, body).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async putRecuperar(correo, codigo) {
        try {
            return await axios.put(`http://localhost:3001/apirecuperar/${correo}/${codigo}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async putNuevoPass( correo, pass ) {
        try {
            return await axios.put(`http://localhost:3001/apirecuperar/newpass/${correo}/${pass}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    }
};

module.exports = { apiSeguridad };