const sql = require('../conexion/conexion');
const crypto = require('crypto')

const usuarioModel = {};

usuarioModel.findById = (usuario, password, result) => {
    let passMD5 = crypto.createHash('md5').update(password).digest("hex");
    let txtQuery = `SELECT * FROM usuario WHERE usuario ` +
    `= '${usuario}' AND clave = '${passMD5}'`;

    sql.query(txtQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ error: "not_found" }, null);
    });
};

module.exports = usuarioModel;