/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright IBM Corporation 2020
*/

const ContatoRepository = require('../repository/contact.repository.js')
const contatoRepository = new ContatoRepository()

const ContatoService = require('../services/contato.service.js');
const contatoService = new ContatoService(contatoRepository)

class ContatoController {

    get = async function(req, res){
        res.send(await contatoService.get( req.params._id));
    }
    
    getAll = async function(req, res){
        res.send(await contatoService.getAll());
    }
    
    insertContato = async function(req, res){
        const { nome, telefone, email } = req.body
        res.send(await contatoService.insertContato(nome, telefone, email));
    }

    remove = async function(req, res) {
        const { _id } = req.params
        res.send(await contatoService.remove(_id))
    }
}

module.exports = ContatoController