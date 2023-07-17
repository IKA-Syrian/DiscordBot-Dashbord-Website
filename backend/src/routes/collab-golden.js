const router = require('express').Router();
const { getBotGuilds } = require("../utils/api")
const User = require("../database/schema/User")
const { getMutualGuilds } = require("../utils/utils")
const con = require("../database/mysql")
const mysql = require("mysql2")
const fetch = require("node-fetch");

const config = {
    "host": "vmi537769.contaboserver.net",
    "user": "darkmen",
    "password": "Darkteam2020top",
    "database": "darkmen_goldenbot"
}

const config1 = {
    "host": "vmi537769.contaboserver.net",
    "user": "darkmen",
    "password": "Darkteam2020top",
    "database": "darkmen_collab_bot"
}

router.get('/user', async (req, res) => {
    const { discordId } = req.query;
    const query = mysql.format('SELECT * FROM member_tracker WHERE account_id = ?', [discordId])
    const result = await con(config).promise().query(query)

    return result ? res.status(200).send(result[0][0]) : res.status(404).send({ msg: "Not Found" })
})

router.get('/series', async (req, res) => {
    const project = req.query.project;
    const query = mysql.format('SELECT * FROM projects WHERE shortname = ?', [project])
    const result = await con(config1).promise().query(query)
    console.log(query)
    if (result[0].length > 0) {
        return res.status(200).send(result[0])
    } else {
        return res.status(404).send({ msg: "Not Found" })
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
    const { project, role } = req.query;
    const query = mysql.format('SELECT * FROM `projects` JOIN `points_list` ON `projects`.`level` = `points_list`.`project_level` WHERE `projects`.`shortname` = (?) AND `points_list`.`Role_name` = (?)', [project, role])
    const result = await con(config1).promise().query(query)
    console.log(query)
    if (result[0].length > 0) {
        return res.status(200).send(result[0])
    } else {
        return res.status(404).send({ msg: "Not Found" })
    }
})

router.get('/seriesinfo', async (req, res) => {
    const channelid = req.query.channelid;
    const query = mysql.format('SELECT * FROM `projects_info` WHERE project_channel_id = ?', [channelid])
    const result = await con(config1).promise().query(query)
    console.log(query)
    try {
        if (result[0].length > 0) {
            return res.status(200).send(result[0][0])
        } else {
            return res.status(404).send({ msg: "Not Found" })
        }
    } catch (e) {
        console.log(e)
    }
})

router.get('/checkchapter', async (req, res) => {
    const { project, chapter } = req.query;
    const role = decodeURIComponent(req.query.role)
    const query = mysql.format('SELECT * FROM chapter_gold WHERE project_name = ? AND chapter_number = ? AND role = ?', [project, chapter, role])
    const result = await con(config).promise().query(query)
    console.log(query)
    if (result[0].length > 0) {
        return res.status(200).send(result[0])
    } else {
        let query1
        switch (role) {
            case 'TL': query1 = mysql.format('SELECT * FROM chapter_gold WHERE `chapter_gold`.`project_name` = (?) AND `chapter_gold`.`chapter_number` = (?) AND `chapter_gold`.`role` REGEXP (?)', [project, chapter, role]); break;
            case 'TLO': query1 = mysql.format('SELECT * FROM chapter_gold WHERE `chapter_gold`.`project_name` = (?) AND `chapter_gold`.`chapter_number` = (?) AND `chapter_gold`.`role` REGEXP (?)', [project, chapter, role]); break;
            case 'CLRD&TS': query1 = mysql.format('SELECT * FROM chapter_gold WHERE `chapter_gold`.`project_name` = (?) AND `chapter_gold`.`chapter_number` = (?) AND (`chapter_gold`.`role` REGEXP "CLRD" OR `chapter_gold`.`role` REGEXP "TS")', [project, chapter]); break;
            case 'CLRD&TL': query1 = mysql.format('SELECT * FROM chapter_gold WHERE `chapter_gold`.`project_name` = (?) AND `chapter_gold`.`chapter_number` = (?) AND (`chapter_gold`.`role` REGEXP "CLRD" OR `chapter_gold`.`role` REGEXP "TL" OR `chapter_gold`.`role` REGEXP "TLO")', [project, chapter]); break;
            case 'CLRD&TLO': query1 = mysql.format('SELECT * FROM chapter_gold WHERE `chapter_gold`.`project_name` = (?) AND `chapter_gold`.`chapter_number` = (?) AND (`chapter_gold`.`role` REGEXP "CLRD" OR `chapter_gold`.`role` REGEXP "TL" OR `chapter_gold`.`role` REGEXP "TLO")', [project, chapter]); break;
            case 'ALL': query1 = mysql.format('SELECT * FROM chapter_gold WHERE `chapter_gold`.`project_name` = (?) AND `chapter_gold`.`chapter_number` = (?) AND (`chapter_gold`.`role` REGEXP "CLRD" OR `chapter_gold`.`role` REGEXP "TL" OR `chapter_gold`.`role` REGEXP "TS")', [project, chapter]); break;
            case "ALLO": query1 = mysql.format('SELECT * FROM chapter_gold WHERE `chapter_gold`.`project_name` = (?) AND `chapter_gold`.`chapter_number` = (?) AND (`chapter_gold`.`role` REGEXP "CLRD" OR `chapter_gold`.`role` REGEXP "TLO" OR `chapter_gold`.`role` REGEXP "TS")', [project, chapter]); break;
            default: query1 = mysql.format('SELECT * FROM chapter_gold WHERE `chapter_gold`.`project_name` = (?) AND `chapter_gold`.`chapter_number` = (?) AND `chapter_gold`.`role` REGEXP (?)', [project, chapter, role]); break;
        }
        console.log(query1)
        const result2 = await con(config).promise().query(query1)
        console.log(result2[0])
        if (result2[0].length > 0) {
            return res.status(200).send(result2[0])
        } else {
            return res.status(404).send({ msg: "Not Found" })
        }
    }
})

router.get('/bonusrate', async (req, res) => {
    const { project, memberID, chapterNum } = req.query;
    const query = mysql.format("SELECT * FROM chapter_gold WHERE project_name = ? AND member_id = ? AND chapter_number = ? AND ( role REGEXP 'CLRD' OR role REGEXP 'TS')", [project, memberID, chapterNum])
    const result = await con(config).promise().query(query)
    console.log(query)
    try {
        return res.status(200).send(result[0])
    } catch (err) {
        return res.status(404).send({ msg: "Not Found" })
    }
})

router.get('/serieslink', async (req, res) => {
    const { id } = req.query;
    const query = mysql.format('SELECT * FROM `projects_info` WHERE `projects_info`.`project_id` = ?', [id])
    const result = await con(config1).promise().query(query)
    console.log(query)
    try {
        return res.status(200).send(result[0])
    } catch (err) {
        return res.status(404).send({ msg: "Not Found" })
    }
})

router.post('/newrecords', async (req, res) => {
    const { member_id, member, project_name, chapter_number, role, adding_points, adding_balance } = req.query;
    query = mysql.format('INSERT INTO chapter_gold (`member_id`, `member`, `project_name`, `chapter_number`, `role`, `adding_points`, `adding_balance`) VALUES (?, ?, ?, ?, ?, ?, ?)', [member_id, member, project_name, chapter_number, decodeURIComponent(role), adding_points, adding_balance]);
    console.log(query)
    try {
        const result = await con(config).promise().query(query)
        return res.status(200).send(result[0])
    } catch (err) {
        return res.status(404).send(err);
    }
})

router.put('/updatebalance', async (req, res) => {
    const { discordId, project, role, bonuscontrol, balancecontrol } = req.query;
    const seriesPayrate = await fetch(`https://site.golden-manga.com/api/collab/seriespayrate?project=${project}&role=${role}`, {
        method: "GET",
    })
    if (seriesPayrate.status === 200) {
        const seriesPayrateData = await seriesPayrate.json()
        console.log(seriesPayrateData)
        const user = await fetch(`https://site.golden-manga.com/api/golden/user?discordId=${discordId}`, {
            method: "GET",
        })
        if (user.status == 200) {
            const userData = await user.json()
            console.log(userData)
            let payrate = seriesPayrateData[0]['earning']
            let bonus = seriesPayrateData[0]['bonus']
            let points = seriesPayrateData[0]['points']
            console.log(payrate, bonus, points)
            let newBonus, newBalance
            if (bonuscontrol == 1) {
                //half of bonus
                newBonus = parseFloat(parseFloat(userData.bonus) + (parseFloat(bonus) * 0.5))
            } else {
                //full bonus
                newBonus = parseFloat(parseFloat(userData.bonus) + parseFloat(bonus))
            }
            if (balancecontrol == 1) {
                newBalance = parseFloat(parseFloat(userData.balance) + parseFloat(payrate)) * 0.5
            } else {
                newBalance = parseFloat(parseFloat(userData.balance) + parseFloat(payrate))
            }
            let newPoints = parseFloat(parseFloat(userData.count) + parseFloat(points))
            console.log(newBalance)
            const query = mysql.format('UPDATE member_tracker SET count = (?), balance = (?), bonus = (?) WHERE account_id = ?', [newPoints, newBalance, newBonus, discordId])
            const result = await con(config).promise().query(query)

            return result ? res.status(200).send([result[0], { adding_points: payrate }]) : res.status(403).send({ msg: "ERROR" })
        } else {
            return res.status(404).send({ msg: "Not Found" })
        }
    } else {
        return res.status(404).send({ msg: "Not Found" })
    }
})

module.exports = router;