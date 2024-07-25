const express = require('express');
const router = express.Router({ mergeParams: true });
router.use(express.json());

const UsuarioController = require('../controllers/usuario.controller');
const usuarioController = new UsuarioController()

router.route('/login')
  .post(usuarioController.login);

router.route('/inserir')
  .post(usuarioController.insertUsuario);

module.exports = router;