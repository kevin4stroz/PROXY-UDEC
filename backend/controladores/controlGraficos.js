// cargar modelo
const graficoModel = require('../modelos/graficos');

// funciones del controlador
module.exports = {

    Grafico1: function(req, res, next){

        console.log("cuerpo peticion = ", req.body)

        graficoModel.Grafico1((err,data) => {
            if(err){
                res.json({status: false, msg: "data grafico1 no encontrada"});
            }else{
                res.json({status: true, msg: "data grafico1 encontrada", data: data});
            }
        });
    },

    Grafico2: function(req, res, next){

        console.log("cuerpo peticion = ", req.body)

        graficoModel.Grafico2((err,data) => {
            if(err){
                res.json({status: false, msg: "data grafico2 no encontrada"});
            }else{
                res.json({status: true, msg: "data grafico2 encontrada", data: data});
            }
        });
    },

    Grafico3: function(req, res, next){

        console.log("cuerpo peticion = ", req.body)

        graficoModel.Grafico3((err,data) => {
            if(err){
                res.json({status: false, msg: "data grafico3 no encontrada"});
            }else{
                res.json({status: true, msg: "data grafico4 encontrada", data: data});
            }
        });
    },

    Grafico4: function(req, res, next){

        console.log("cuerpo peticion = ", req.body)

        graficoModel.Grafico4((err,data) => {
            if(err){
                res.json({status: false, msg: "data grafico4 no encontrada"});
            }else{
                res.json({status: true, msg: "data grafico4 encontrada", data: data});
            }
        });
    },
}