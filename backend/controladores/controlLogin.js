// librerias
const jwt = require('jsonwebtoken');

// cargar modelo
const usuarioModel = require('../modelos/login');


// funciones del controlador
module.exports = {

    login: function(req, res, next){

        console.log("cuerpo peticion = ", req.body)

        if( req.body.password!=null && typeof(req.body.password)=='string' && req.body.password!="" &&
            req.body.username!=null && typeof(req.body.username)=='string' && req.body.username!="" ){
            
            var username = req.body.username;
            var passwd = req.body.password;

            usuarioModel.findById(username ,passwd, (err,data) => {
                if(err){
                    res.json({status: false, msg: "usuario no existe"});
                }else{

                    const token = jwt.sign({
                        id: data['usuario']}, 
                        req.app.get('secretKey'), 
                        { expiresIn: '24h' }
                    );

                    res.json({status: true, msg: "login correct", token: token});
                }
            });

        }else{
            res.json({status: false, msg: "data post vacia"});
        }
    },

}