const jwt = require('jsonwebtoken');
const ContatoRepository = require('../repository/contact.repository.js')
const contatoRepository = new ContatoRepository()

const ContatoService = require('../services/contato.service.js');
const contatoService = new ContatoService(contatoRepository)

class ContatoController {

    get = async function(req, res){
        
        try {
            verifyToken(req, res);
            
            const resposta = await contatoService.get( req.params._id);

            jwt.verifyAsync(req.token,'secretkey',(err,authData)=>{
                if(err)
                    res.sendStatus(403);
                else{
                    return resposta
                }
            })
        } catch (error) {
            return res.status(400).json({ error: error.message })          
        }
    }
    
    getAll = async function(req, res){
        verifyToken(req, res);

        const resposta = await contatoService.getAll();
        
        jwt.verify(req.token,'secretkey',(err,authData)=>{
            if(err)
                res.sendStatus(403);
            else{
                res.send(resposta);
            }
        })
    }
    
    insertContato = function(req, res){
        verifyToken(req, res);

        const resposta = contatoService.insertContato(req.body.nome, req.body.telefone, req.body.email);
        
        jwt.verify(req.token,'secretkey',(err,authData)=>{
            if(err)
                res.sendStatus(403);
            else{
                res.send(resposta);
            }
        })
    }
    
    updateContato = function(req, res){
        verifyToken(req, res);

        const resposta = contatoService.updateContato(req.params._id, req.body.nome, req.body.telefone, req.body.email);

        jwt.verify(req.token,'secretkey',(err,authData)=>{
            if(err)
                res.sendStatus(403);
            else{
                res.send(resposta);
            }
        })
    }
    
    remove = async function(req, res){
        verifyToken(req, res);

        const resposta = contatoService.remove( req.params._id);

        await jwt.verify(req.token,'secretkey',(err,authData)=>{
            if(err)
                res.sendStatus(403);
            else{
                res.send(resposta);
            }
        })
    }
}

async function verifyToken(req,res){
    //Auth header value = > send token into header

    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){

        //split the space at the bearer
        const bearer = bearerHeader.split(' ');
        //Get token from string
        const bearerToken = bearer[1];

        //set the token
        req.token = bearerToken;

    }else{
        //Fobidden
        res.sendStatus(403);
    }

}

module.exports = ContatoController