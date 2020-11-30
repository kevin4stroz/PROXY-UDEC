// cargar modelo
const tablaModel = require('../modelos/tabla');

// funciones del controlador
module.exports = {

    GetDataTable: function(req, res, next){

        console.log("cuerpo peticion = ", req.body)

        tablaModel.GetData((err,data) => {
            if(err){
                res.json({status: false, msg: "logs no encontrados"});
            }else{
                res.json({status: true, msg: "logs", data: data});
            }
        });
    },
}