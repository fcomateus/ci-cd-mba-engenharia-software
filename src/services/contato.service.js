/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright IBM Corporation 2020
*/

class ContatoService {

    repository = null

    constructor(repository) {
        this.repository = repository
    }

    get = async function(_id){
        if(isNaN(_id)) {
            throw new Error('Id não numérico')
        }

        const contact = await this.repository.getById(_id)

        if(contact == null) {
            throw new Error('Contato não encontrado')
        }

        return contact
    }
    
    getAll = async function(){
        return await this.repository.list() 
    }
    
    insertContato = async function(nome, telefone, email){
        return await this.repository.create(nome, telefone, email)
    }
    
    updateContato = async function(_id, nome, telefone, email){
        return await this.repository.update(_id, nome, telefone, email)
    }
    
    remove = async function(_id){
        return await this.repository.remove(_id);
    }

    validatePhone = function(_phone) {

        if(String(_phone).length < 11 || String(_phone).length > 14) {
            return false
        }

        const regex = /^[0-9]+$/;
        return regex.test(_phone)
    }

    validateContactName = (name) => {
        let res =  /^[a-zA-Z\s]*$/.test(name);
        return res;
    }
}

module.exports = ContatoService