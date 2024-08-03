class UsuarioService {

    repository = null

    constructor(repository) {
        this.repository = repository
    }

    getByNamePassword = async function(name, password){
        return await this.repository.getByNamePassword(name, password)
    }
    
    insertUsuario = async function(name, password){
        return await this.repository.create(name, password)
    }
    
    updateUsuario = async function(_id, name, password){
        return await this.repository.update(_id, name, password)
    }
    
    remove = async function(_id){
        return await this.repository.remove(_id);
    }
}

module.exports = UsuarioService