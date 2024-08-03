const jwt = require('jsonwebtoken');
const UsuarioRepository = require('../repository/user.repository.js')
const usuarioRepository = new UsuarioRepository()

const UsuarioService = require('../services/usuario.service.js');
const usuarioService = new UsuarioService(usuarioRepository)

class UsuarioController {

    
    login = async function(req, res){
        const user = await usuarioService.getByNamePassword(req.body.email, req.body.password);

        jwt.sign({user}, 'secretkey', (err, token) => {
            res.json(token);
        })
    }
    
    insertUsuario = function(req, res){
        res.send(usuarioService.insertUsuario(req.body.name, req.body.password));
    }
    
}

module.exports = UsuarioController