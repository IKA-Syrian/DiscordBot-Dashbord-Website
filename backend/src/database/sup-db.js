const mysql = require("mysql2");

function dbConnect(dbName, query){
    var con = mysql.createPool({
        host: "vmi537769.contaboserver.net",
        user: "darkmen",
        password: "Darkteam2020top",
        database: `darkmen_${dbName}`,
        // connectTimeout: 100
    })
    con.query(query, function(err,res){
        // console.log(res)
        con.end()
        if(err){
            return err
        }else{
            console.log(res[0])
            return res
        }
    })
}

module.exports = { dbConnect }