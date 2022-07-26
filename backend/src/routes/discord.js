const router = require('express').Router();
const { getBotGuilds } = require("../utils/api")
const User = require("../database/schema/User")
const { getMutualGuilds } = require("../utils/utils")
const config = require("../database/config.json")
const con = require("../database/mysql")
router.get('/guilds', async (req, res) => {
    const guilds = await getBotGuilds()
    try{
        const user = await User.findOne({
            discordId: req.user.discordId,
        })
        if(user){
            const userID = user.discordId
            const userGuilds = user.get("guilds")
            // console.log(userGuilds)
            const mutualGuilds = getMutualGuilds( userGuilds, guilds, userID)
            console.log(mutualGuilds)
            res.send(mutualGuilds)
        }
    }catch(err){
        return res.status(401).send({ msg: "Unauthorized" })
    }
    
})

router.put('/guilds/:guildId/prefix', async (req, res) => {
    const { prefix , data } = req.body;
    console.log(prefix)
    
})

router.get('/guilds/:guildId/top', async (req, res) => {
    const { guildId } = req.params;
    console.log(req.params)
    const guild = config.filter(guild => guild.server == guildId);
    console.log(guild)
    const result = await con(guild[0].data).promise().query(`SELECT * FROM member_tracker ORDER BY count DESC LIMIT 5`)
    console.log(result[0])
    return result ? res.status(200).send(result[0]) : res.status(404).send({ msg: "Not Found" })
})

router.get('/guilds/:guildId/all', async (req, res) => {
    const { guildId } = req.params;
    console.log(req.params)
    const guild = config.filter(guild => guild.server == guildId);
    console.log(guild)
    const result = await con(guild[0].data).promise().query(`SELECT * FROM member_tracker ORDER BY count DESC`)
    console.log(result[0])
    return result ? res.status(200).send(result[0]) : res.status(404).send({ msg: "Not Found" })
})

router.get('/guilds/:guildId/last5', async (req, res) => {
    const { guildId } = req.params;
    console.log(req.params)
    const guild = config.filter(guild => guild.server == guildId);
    console.log(guild)
    const result = await con(guild[0].data).promise().query(`SELECT * FROM chapter_gold ORDER BY date DESC LIMIT 5`)
    console.log(result[0])
    return result ? res.status(200).send(result[0]) : res.status(404).send({ msg: "Not Found" })
})

router.get('/guilds/:guildId/last5series', async (req, res) => {
    const { guildId } = req.params;
    console.log(req.params)
    const guild = config.filter(guild => guild.server == guildId);
    console.log(guild)
    const result = await con(guild[0].data).promise().query(`SELECT * FROM projects ORDER BY id DESC LIMIT 5`)
    console.log(result[0])
    return result ? res.status(200).send(result[0]) : res.status(404).send({ msg: "Not Found" })
})

router.get('/guilds/:guildId/userprofile', async (req, res) => {
    const { guildId } = req.params;
    const { userid } = req.query
    console.log(req.params)
    const guild = config.filter(guild => guild.server == guildId);
    console.log(guild)
    const result = await con(guild[0].data).promise().query(`SELECT * FROM member_tracker WHERE account_id = ?`, [userid])
    console.log(result[0])
    return result ? res.status(200).send(result[0]) : res.status(404).send({ msg: "Not Found" })
})

router.get('/guilds/:guildId/userrecord', async (req, res) => {
    const { guildId } = req.params;
    console.log(req.params)
    const guild = config.filter(guild => guild.server == guildId);
    console.log(guild)
    const { userid } = req.query
    switch(guildId){
        case "877691163606413423":
            const result = await con(guild[0].data).promise().query(`SELECT * FROM chapter_gold WHERE member_id = ?`, [userid])
            console.log(result[0])
            return result ? res.status(200).send(result[0]) : res.status(404).send({ msg: "Not Found" })
            
        default:
            const { month } = req.query;
            if(!month){
                let ts = Date.now();
                let date_ob = new Date(ts);
                let monthIndex = date_ob.getMonth();
                const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                const result1 = await con(guild[0].data).promise().query(`SELECT * FROM chapter_gold WHERE member_id = ? AND monthname(date)= ?`, [userid, monthName[monthIndex]])
                console.log(result1[0])
                return result1 ? res.status(200).send(result1[0]) : res.status(404).send({ msg: "Not Found" })
            }else{
                const result1 = await con(guild[0].data).promise().query(`SELECT * FROM chapter_gold WHERE member_id = ? AND monthname(date)= ?`, [userid, month])
                console.log(result1[0])
                return result1 ? res.status(200).send(result1[0]) : res.status(404).send({ msg: "Not Found" })
            }
            
    }
})
module.exports = router;