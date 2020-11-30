
// funciones del controlador
module.exports = {

    Check: function(req, res, next){

        console.log("cuerpo peticion = ", req.body)
         res.json({status: true, msg: "jwt ok"});
    },
}