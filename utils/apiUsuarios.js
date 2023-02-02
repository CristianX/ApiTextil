const axios = require('axios');
const { response } = require('express');

customConfig = {
    headers: {
    'Content-Type': 'application/json'
    }
};


const adminClientes = {
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

    async putBorrarReclamo(id, body) {
        try {
            return await axios.put(`http://localhost:3002/apiadminclientes/${id}`, body).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },
};

const adminReclamos = {
    async getByNombre(nombre) {
        try {
            return await axios.get(`http://localhost:3002/apiadminreclamos/${nombre}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async postReclamoById(id, body) {
        try {
            return await axios.post(`http://localhost:3002/apiadminreclamos/${id}`, body).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async putBorrarReclamo(id, body) {
        try {
            return await axios.put(`http://localhost:3002/apiadminreclamos/${id}`, body).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },
};

const crudUsuarios = {
    async getAll() {
        try {
            return await axios.get(`http://localhost:3002/apiusuario`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async postUsuario( body ) {
        try {
           return await axios.post(`http://localhost:3002/apiusuario`, body).then((response) => {
                return response.data;
            }); 
        } catch (error) {
            return error;
        }
    },

    async deleteUsuario( id ) {
        try {
            return await axios.delete(`http://localhost:3002/apiusuario/${id}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async putUsuario( id ) {
        try {
            return await axios.put(`http://localhost:3002/apiusuario/${id}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },
};

const registro = {
    async getRegistro(correo, pass, rol) {
        try {
            return await axios.get(`http://localhost:3002/apiregistro/${correo}/${pass}/${rol}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async postRegistro(body) {
        try {
            return await axios.post(`http://localhost:3002/apiregistro`, body).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async deleteRegistro( id ) {
        try {
            return await axios.delete(`http://localhost:3002/apiregistro/${id}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async putRegistro( id ) {
        try {
            return await axios.put(`http://localhost:3002/apiregistro/${id}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },
};

const Usumicuenta = {
    async getUsumicuenta( id ) {
        try {
            return await axios.get(`http://localhost:3002/apiusumicuenta/${id}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async deleteUsumicuenta( id ) {
        try {
            return await axios.delete(`http://localhost:3002/apiusumicuenta/${id}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async putUsumicuenta( id, body ) {
        try {
            return await axios.put(`http://localhost:3002/apiusumicuenta/${id}`, body).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async postUsumicuenta( id, body ) {
        try {
            return await axios.post(`http://localhost:3002/apiusumicuenta/${id}`, body).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    }
};

const UsuReclamos = {
    async getUsuReclamos( cliente ) {
        try {
            return await axios.get(`http://localhost:3002/apiusureclamo/${cliente}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async postUsuReclamos( cliente, body ) {
        try {
            return await axios.post(`http://localhost:3002/apiusureclamo/${cliente}`, body).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async putUsuReclamos( id, body ) {
        try {
            return await axios.put(`http://localhost:3002/apiusureclamo/${id}`, body).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },
};

const UsuVerificacion = {
    async getUsuVerificacion( correo ) {
        try {
            return await axios.get(`http://localhost:3002/apiverificacion/${correo}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },

    async postUsuVerificacion( correo ) {
        try {
            return await axios.post(`http://localhost:3002/apiverificacion/${correo}`).then((response) => {
                return response.data;
            });
        } catch (error) {
            return error;
        }
    },


};

module.exports = {adminClientes, adminReclamos, crudUsuarios, registro, Usumicuenta, UsuReclamos, UsuVerificacion};