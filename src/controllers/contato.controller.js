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

        try {
            const contact = await contatoService.get( req.params._id)
            return contact
        } catch (error) {
            return res.status(400).json({ error: error.message })          
        }
    }
    
    getAll = async function(req, res){
        res.send(await contatoService.getAll());
    }
    
    insertContato = function(req, res){
        res.send(contatoService.insertContato(req.body.nome, req.body.telefone, req.body.email));
    }
    
    updateContato = function(req, res){
        res.send(contatoService.updateContato(req.params._id, req.body.nome, req.body.telefone, req.body.email));
    }
    
    remove = async function(req, res){
        res.send(await contatoService.remove( req.params._id));
    }
}

module.exports = ContatoController