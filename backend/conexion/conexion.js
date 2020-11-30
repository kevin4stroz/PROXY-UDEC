var mysql = require('mysql');


const buff = Buffer.from(process.env.PASS, 'base64');

const objConfig = {
   host: process.env.HOST_DB,
   user: process.env.USER,
   password:  buff.toString('utf-8'),
   database: process.env.DB,
   port: process.env.PORT
}

var connection = mysql.createConnection(objConfig);

connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});

module.exports = connection;