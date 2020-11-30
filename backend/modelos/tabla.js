const sql = require('../conexion/conexion');


const tablaModel = {};

tablaModel.GetData = (result) => {


    let txtQuery = `SELECT 
                        idlogs_squid,user_agent, tcp_log, ip, fecha, metodo, url, res_codigo, size, redireccion, version_http  
                    FROM 
                        db_proxy.logs_squid 
                    WHERE 
                        logs_squid.user_agent <> '-'
                    LIMIT 
                        15`;


    sql.query(txtQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found data table: ", res);
        result(null, res);
        return;
      }
  
      // not found Customer with the id
      result({ error: "not_found" }, null);
    });
};

module.exports = tablaModel;