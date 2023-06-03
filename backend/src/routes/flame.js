const router = require('express').Router();
const { getBotGuilds } = require("../utils/api")
const User = require("../database/schema/User")
const { getMutualGuilds } = require("../utils/utils")
const config = {
    "host":"vmi537769.contaboserver.net",
    "user": "darkmen",
    "password": "Darkteam2020top",
    "database":"darkmen_flameen"
}
const con = require("../database/mysql")
const mysql = require("mysql2")
const fetch = require("node-fetch");
const Selector = require('./switcher');


router.get('/user', async (req, res) => {
    const { discordId } = req.query;
    const query = mysql.format('SELECT * FROM member_tracker WHERE account_id = ?', [discordId])
    const result = await con(config).promise().query(query)

    return result ? res.status(200).send(result[0][0]) : res.status(404).send({ msg: "Not Found" })
})

router.get('/series', async (req, res) => {
    const project  = req.query.project;
    const query = mysql.format('SELECT * FROM projects WHERE shortname = ?', [project])
    const result = await con(config).promise().query(query)
    console.log(query)
    if(result[0].length > 0){
        return res.status(200).send(result[0])
    }else{
        return  res.status(404).send({ msg: "Not Found" })
    }
   
})

router.get('/chapters', async (req, res) => {
    const { userID, month } = req.query;
    const query = mysql.format('SELECT * FROM chapter_gold WHERE member_id = ? AND monthname(date) = ? ', [userID, month])
    console.log(query)
    const result = await con(config).promise().query(query)
    return result ? res.status(200).send(result[0]) : res.status(404).send({ msg: "Not Found" })
})

router.get('/seriespayrate', async (req, res) => {
    const project  = req.query.project;
    const role = req.query.role;
    const query = mysql.format('SELECT shortname,? FROM projects WHERE shortname = ?', [role, project])
    const result = await con(config).promise().query(query)
    console.log(query)
    if(result[0].length > 0){
        return res.status(200).send(result[0])
    }else{
        return  res.status(404).send({ msg: "Not Found" })
    }
   
})


router.get('/checkchapter', async (req, res) => {
    const { project, chapter, role } = req.query;
    const query = mysql.format('SELECT * FROM chapter_gold WHERE project_name = ? AND chapter_number = ? AND role = ?', [project, chapter, role])
    const result = await con(config).promise().query(query)
    console.log(query)
    if(result[0].length > 0){
        return res.status(200).send(result[0])
    }else{
        return  res.status(404).send({ msg: "Not Found" })
    }
})



router.post('/newrecords', async (req, res) => { 
    const { control, member_id, member, project_name, chapter_number, role, adding_points, page_count } = req.query;
    let query
    if(control === 1){
        query = mysql.format('INSERT INTO chapter_gold (`member_id`, `member`, `project_name`, `chapter_number`, `role`, `adding_points`, `page_count`) VALUES (?, ?, ?, ?, ?, ?, ?)', [member_id, member, project_name, chapter_number, role, adding_points, page_count]);
    }else{
        query = mysql.format('INSERT INTO chapter_gold (`member_id`, `member`, `project_name`, `chapter_number`, `role`, `adding_points`) VALUES (?, ?, ?, ?, ?, ?)', [member_id, member, project_name, chapter_number, role, adding_points]);
    }

    try{
        const result = await con(config).promise().query(query)
        return res.status(200).send(result[0])
    }catch(err){
        return res.status(404).send(err);
    }
})

router.put('/updatebalance', async (req, res) => {
    const { discordId, project, role, control } = req.query;
    const seriesPayrate = await fetch(`https://site.golden-manga.com/api/flame/series?project=${project}`, {
        method: "GET",
    })
    if(seriesPayrate.status === 200){
        const seriesPayrateData = await seriesPayrate.json()
        console.log(seriesPayrateData)
        // return res.status(200).send(seriesPayrateData)
        const user = await fetch(`https://site.golden-manga.com/api/flame/user?discordId=${discordId}`, {
            method: "GET",
        })
        if(user.status == 200){
            const userData = await user.json()
            console.log(userData)
            let collection = new Selector(role, seriesPayrateData[0])
            let payrates = collection.select()
            console.log(payrates)
            if(control == 1){
                //half chapter
                payrates = parseFloat(parseFloat(payrates)/2)
    
            }else{
                //full chapter
                payrates = parseFloat(payrates)
            }
            let newBalance = parseFloat(parseFloat(userData.count) + parseFloat(payrates))
            console.log(newBalance)
            const query = mysql.format('UPDATE member_tracker SET count = ? WHERE account_id = ?', [newBalance, discordId])
            const result = await con(config).promise().query(query)
            
            return result ? res.status(200).send([result[0], {adding_points:payrates}]) : res.status(403).send({ msg: "ERROR" })
        }else{
            return res.status(404).send({ msg: "Not Found" })
        }
        // const query = mysql.format('UPDATE member_tracker SET balance = balance + ? WHERE account_id = ?', [seriesPayrateData[0].payrate, discordId])
        // const result = await con(config).promise().query(query)
    }else{
        return res.status(404).send({ msg: "Not Found" })
    }
    // console.log(seriesPayrate.status)
})


module.exports = router;