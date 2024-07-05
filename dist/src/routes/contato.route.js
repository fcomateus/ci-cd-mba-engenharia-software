/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright IBM Corporation 2020
*/

const express = require('express');
const router = express.Router({ mergeParams: true });
router.use(express.json());

const ContatoController = require('../controllers/contato.controller');
const contatoController = new ContatoController()

router.route('/')
    .get(contatoController.getAll);

router.route('/:_id')
  .get(contatoController.get);

router.route('/inserir')
  .post(contatoController.insertContato);

router.route('/atualizar/:_id')
  .post(contatoController.updateContato);

router.route('/remover/:_id')
  .delete(contatoController.remove);

module.exports = router;