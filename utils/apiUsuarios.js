const axios = require('axios');
const { response } = require('express');


const apiUsuarios = {
    async getByNombre(nombre) {
        try {
            return await axios.get(`http://localhost:3002/apiadminclientes/${nombre}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async postRespuestaById(id, body) {
        try {
            return await axios.post(`http://localhost:3002/apiadminclientes/${id}`, body).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async putBorrarRespuesta(id) {
        try {
            return await axios.put(`http://localhost:3002/apiadminclientes/${id}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    }
};

module.exports = apiUsuarios;