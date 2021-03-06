const Role = require('../models/role');
const Usuario = require('../models/usuario');
const esRoleValido = async (rol='') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
            throw new Error(`el rol ${rol} no está registrado en la BD`)
    }
}
const emailExiste = async(correo = '') => {
    //verificar si existe correo
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo: ${correo}, ya está registrado`);
    }
}
const existeUsuarioPorId = async(id) => {
    //verificar si existe usuario
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id no existe: ${id}`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}