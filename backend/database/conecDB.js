const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "valhalla_thor",
    port: 3306
});

con.connect(function(err){
 if(err){
     console.log(err);
     return;
 }else{
    console.log("DB CONECTADA");
 }

});

module.exports = con;