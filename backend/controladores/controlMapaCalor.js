// cargar modelo
const mapaCalorModel = require('../modelos/mapaCalor');

// funciones del controlador
module.exports = {

    GetCountrys: function(req, res, next){

        console.log("cuerpo peticion = ", req.body)

        mapaCalorModel.GetData((err,data) => {
            if(err){
                res.json({status: false, msg: "paises no encontrados"});
            }else{
                res.json({status: true, msg: "paises encontrados", data: data});
            }
        });
    },
}