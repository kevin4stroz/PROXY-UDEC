const sql = require('../conexion/conexion');


const graficosModel = {};

graficosModel.Grafico1 = (result) => {


    let txtQuery = `SELECT 
                        ip, COUNT(ip) as cantidad
                    FROM 
                        db_proxy.country_ip
                    GROUP BY ip
                    ORDER BY cantidad desc
                    limit 10`;


    sql.query(txtQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found country: ", res);
        result(null, res);
        return;
      }
  
      // not found Customer with the id
      result({ error: "not_found" }, null);
    });
};

graficosModel.Grafico2 = (result) => {


    let txtQuery = `SELECT 
                        family, count(family) as cantidad
                    FROM 
                        db_proxy.navegador
                    GROUP BY family
                    ORDER BY cantidad desc
                    limit 10`;


    sql.query(txtQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found data grafico: ", res);
        result(null, res);
        return;
      }
  
      // not found Customer with the id
      result({ error: "not_found" }, null);
    });
};

graficosModel.Grafico3 = (result) => {


    let txtQuery = `SELECT 
                        url, count(url) as cantidad
                    FROM 
                        db_proxy.logs_squid
                    WHERE
                        url <> 'error:transaction-end-before-headers'
                    GROUP BY url
                    ORDER BY cantidad desc
                    limit 10`;


    sql.query(txtQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found data grafico: ", res);
        result(null, res);
        return;
      }
  
      // not found Customer with the id
      result({ error: "not_found" }, null);
    });
};

graficosModel.Grafico4 = (result) => {


    let txtQuery = `SELECT 
                        family, count(family) as cantidad
                    FROM 
                        db_proxy.sistema_operativo
                    GROUP BY family
                    ORDER BY cantidad desc
                    limit 10`;


    sql.query(txtQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found data grafico: ", res);
        result(null, res);
        return;
      }
  
      // not found Customer with the id
      result({ error: "not_found" }, null);
    });
};

module.exports = graficosModel;