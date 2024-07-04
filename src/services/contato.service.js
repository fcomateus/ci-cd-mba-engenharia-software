/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright IBM Corporation 2020
*/

const data = require('../data');
const Contato = require('../models/contact');

const get = async function(_id){
    const contatos = new Contato();
    return (await contatos.getById(_id)).at(0);
}

const getAll = async function(){
    const contatos = new Contato();
    return await contatos.list() 
}

const insertContato = async function(nome, telefone, email){
    const contatos = new Contato();
    return await contatos.create(nome, telefone, email)
}

const updateContato = async function(_id, nome, telefone, email){
    const contatos = new Contato();
    return await contatos.update(_id, nome, telefone, email)
}

const remove = async function(_id){
    const contatos = new Contato();
    return (await contatos.remove(_id));
}

module.exports = {
    get,
    getAll,
    insertContato,
    updateContato,
    remove
};