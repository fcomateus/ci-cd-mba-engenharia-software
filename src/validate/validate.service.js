class ValidateService {
    ValidateService(){}

    validarEmail = function (email) {    
        const expressao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expressao.test(email);
    }
}

module.exports = ValidateService