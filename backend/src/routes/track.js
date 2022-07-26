const router = require('express').Router();
const { getBotGuilds } = require("../utils/api")
const User = require("../database/schema/User")
const { getMutualGuilds } = require("../utils/utils")
const mysql = require("mysql2")
const con = require("../database/mysql")
// const { dbConnect } = require("../database/sup-db")
router.get('/', async (req, res) => {
    const table = req.query.table
    const guildID = req.query.guildID
    const dbName = req.query.dbName
    const dbPass = req.query.dbPass
    const query = mysql.format(`SELECT * FROM ${table}`, [])
    const result = await con.promise().query(query).then(con.on('release', function (con) {
        console.log('Connection %d released', con.threadId);
    }))
    console.log(result[0][0])
    // const guilds = await getBotGuilds()
    // try{
    //     const user = await User.findOne({
    //         discordId: req.user.discordId,
    //     })
    //     if(user){
    //         const userGuilds = user.get("guilds")
    //         // console.log(userGuilds)
    //         const mutualGuilds = getMutualGuilds( userGuilds, guilds )
    //         console.log(mutualGuilds)
    //         res.send(mutualGuilds)
    //     }
    // }catch(err){
        return res.status(200).send(result[0])
    // }
    
})
router.post('/send', async (req, res) => {
    console.log(req.query.type)
    const table = req.query.table
    const guildID = req.query.guildID
    // const dbName = req.query.dbName
    const result = con.promise().query(`SELECT * FROM bot_info WHERE guildID = ${guildID}`)
    const dbName = result[0][0].database
    var connect = mysql.createConnection({
        host: "vmi537769.contaboserver.net",
        user: "darkmen",
        password: "Darkteam2020top",
        database: `darkmen_${dbName}`,
    })
    if(req.query.type == "INSERT"){
        let handError = false;
        con.promise().query(`INSERT INTO ${table} (guild_id , db_name , db_pass) VALUES (?, ?, ?)`, [guildID, dbName, dbPass]).catch((err) => {
            // console.log(err)
            return handError = true;
        }).then(con.on('release', function (con) {
            console.log('Connection %d released', con.threadId);
        })).then(() => {
            console.log(handError)
        })
    }else if(req.query.type == "UPDATE"){

    }else if(req.query.type == "DELETE"){

    }
    // else if(){

    // }else if(){

    // }
    // res.send(200)
})


module.exports = router;