const sql = require('../conexion/conexion');


const mapaModel = {};

mapaModel.GetData = (result) => {


    let txtQuery = `SELECT 
                        country_ip.country, count(country_ip.country) as cantidad 
                    FROM 
                        db_proxy.country_ip 
                    group by 
                        country_ip.country 
                    order by 
                        cantidad 
                    desc`;


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

module.exports = mapaModel;