const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {
    //const {q, nombre='no name', apikey,page=1,limit}= req.query;
    const {limite = 5,desde = 0} = req.query;
    const query = {estado: true};
    
    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
     ])
    
    res.json({
        total,
        usuarios
    })
};
const usuariosPut = async(req, res = response)=> {
    const { id }  = req.params;
    const {_id,password,google,correo,...resto} = req.body;

    //Todo validar con la bd
    if(password){
        //encriptar contraseña
        const  salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password,salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json(usuario)
}
const usuariosPost = async (req, res = response)=> {
    
    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
    
    //encriptar contraseña
    const  salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password,salt);
    //guardar en bd
    await usuario.save();
    res.json({
        msg: 'post API-controlador',
        usuario
    })
}

const usuariosDelete = async(req, res = response)=> {
    const {id} = req.params;
    //fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false}); 
    res.json(usuario)
}
const usuariosPatch = (req, res = response)=> {
    res.json({
        msg: 'patch API-controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
}