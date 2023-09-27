const router = require('express').Router();
const { getBotGuilds } = require("../utils/api")
const User = require("../database/schema/User")
const { getMutualGuilds } = require("../utils/utils")
const config = {
    "host": "vmi537769.contaboserver.net",
    "user": "darkmen",
    "password": "Darkteam2020top",
    "database": "darkmen_flameen"
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
    const project = req.query.project;
    const query = mysql.format('SELECT * FROM projects WHERE shortname = ?', [project])
    const result = await con(config).promise().query(query)
    console.log(query)
    if (result[0].length > 0) {
        return res.status(200).send(result[0])
    } else {
        return res.status(404).send({ msg: "Not Found" })
    }
})

router.get('/getseries', async (req, res) => {
    const project = req.query.project;
    const query = mysql.format('SELECT * FROM projects WHERE project = ?', [project])
    const result = await con(config).promise().query(query)
    console.log(query)
    if (result[0].length > 0) {
        return res.status(200).send(result[0][0])
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

router.get('/chapter', async (req, res) => {
    const { userID, month, year } = req.query;
    const query = mysql.format('SELECT * FROM chapter_gold WHERE member_id = ? AND monthname(date) = ? AND year(date) = ?', [userID, month, year])
    console.log(query)
    const result = await con(config).promise().query(query)
    return result ? res.status(200).send(result[0]) : res.status(404).send({ msg: "Not Found" })
})


router.get('/lastrecord', async (req, res) => {
    const { discordId } = req.query;
    let ts = Date.now();
    let date_ob = new Date(ts);
    let month = date_ob.getMonth();
    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const query = mysql.format('SELECT * FROM chapter_gold WHERE member_id = ? AND monthname(date)= ?', [discordId, monthName[month]])
    const result = await con(config).promise().query(query)
    if (result[0].length > 0) {
        return res.status(200).send({
            total_Chapters: result[0].length,
            data: result[0][result[0].length - 1]
        })
    } else {
        const query2 = mysql.format('SELECT * FROM chapter_gold WHERE member_id = ? AND monthname(date)= ?', [discordId, monthName[month - 1]])
        const result2 = await con(config).promise().query(query2)
        if (result2[0].length > 0) {
            return res.status(200).send({
                total_Chapters: result2[0].length,
                data: result2[0][result2[0].length - 1]
            })
        } else {
            return res.status(404).send({ msg: "Not Found" })
        }
    }
})


router.get('/seriespayrate', async (req, res) => {
    const project = req.query.project;
    const role = req.query.role;
    const query = mysql.format('SELECT shortname,? FROM projects WHERE shortname = ?', [role, project])
    const result = await con(config).promise().query(query)
    console.log(query)
    if (result[0].length > 0) {
        return res.status(200).send(result[0])
    } else {
        return res.status(404).send({ msg: "Not Found" })
    }

})


router.get('/checkchapter', async (req, res) => {
    const { project, chapter, role } = req.query;
    const query = mysql.format('SELECT * FROM chapter_gold WHERE project_name = ? AND chapter_number = ? AND role = ?', [project, chapter, role])
    const result = await con(config).promise().query(query)
    console.log(query)
    if (result[0].length > 0) {
        return res.status(200).send(result[0])
    } else {
        return res.status(404).send({ msg: "Not Found" })
    }
})



router.post('/newrecords', async (req, res) => {
    const { control, member_id, member, project_name, chapter_number, role, adding_points, page_count } = req.query;
    let query
    if (control === 1) {
        query = mysql.format('INSERT INTO chapter_gold (`member_id`, `member`, `project_name`, `chapter_number`, `role`, `adding_points`, `page_count`) VALUES (?, ?, ?, ?, ?, ?, ?)', [member_id, member, project_name, chapter_number, role, adding_points, page_count]);
    } else {
        query = mysql.format('INSERT INTO chapter_gold (`member_id`, `member`, `project_name`, `chapter_number`, `role`, `adding_points`) VALUES (?, ?, ?, ?, ?, ?)', [member_id, member, project_name, chapter_number, role, adding_points]);
    }

    try {
        const result = await con(config).promise().query(query)
        return res.status(200).send(result[0])
    } catch (err) {
        return res.status(404).send(err);
    }
})

router.put('/updatebalance', async (req, res) => {
    const { discordId, project, role, control } = req.query;
    const seriesPayrate = await fetch(`https://site.golden-manga.com/api/flame/series?project=${project}`, {
        method: "GET",
    })
    if (seriesPayrate.status === 200) {
        const seriesPayrateData = await seriesPayrate.json()
        console.log(seriesPayrateData)
        // return res.status(200).send(seriesPayrateData)
        const user = await fetch(`https://site.golden-manga.com/api/flame/user?discordId=${discordId}`, {
            method: "GET",
        })
        if (user.status == 200) {
            const userData = await user.json()
            console.log(userData)
            let collection = new Selector(role, seriesPayrateData[0])
            let payrates = collection.select()
            console.log(payrates)
            if (control == 1) {
                //half chapter
                payrates = parseFloat(parseFloat(payrates) / 2)

            } else {
                //full chapter
                payrates = parseFloat(payrates)
            }
            let newBalance = parseFloat(parseFloat(userData.count) + parseFloat(payrates))
            console.log(newBalance)
            const query = mysql.format('UPDATE member_tracker SET count = ? WHERE account_id = ?', [newBalance, discordId])
            const result = await con(config).promise().query(query)

            return result ? res.status(200).send([result[0], { adding_points: payrates }]) : res.status(403).send({ msg: "ERROR" })
        } else {
            return res.status(404).send({ msg: "Not Found" })
        }
        // const query = mysql.format('UPDATE member_tracker SET balance = balance + ? WHERE account_id = ?', [seriesPayrateData[0].payrate, discordId])
        // const result = await con(config).promise().query(query)
    } else {
        return res.status(404).send({ msg: "Not Found" })
    }
    // console.log(seriesPayrate.status)
})

router.get('/serieslist', async (req, res) => {
    const query = mysql.format('SELECT * FROM projects')
    const result = await con(config).promise().query(query)
    return result ? res.status(200).send(result[0]) : res.status(404).send({ msg: "Not Found" })
})
router.get('/getseriesData', async (req, res) => {
    const query = mysql.format('SELECT * FROM projects_data')
    const result = await con(config).promise().query(query)
    return result ? res.status(200).send(result[0]) : res.status(404).send({ msg: "Not Found" })
})
router.get('/editseries', async (req, res) => {
    const { channelid } = req.query;
    const query = mysql.format('SELECT * FROM projects_data AS D JOIN projects AS P ON D.sid = P.id WHERE D.channel_id = ?', [channelid])
    const result = await con(config).promise().query(query)
    let data = {
        tl_payrate: result[0][0].tl_payrate,
        cl_bb: result[0][0].cl_bb,
        cl_sfx: result[0][0].cl_sfx,
        cl_all: result[0][0].cl_all,
        ts_bb: result[0][0].ts_bb,
        ts_sfx: result[0][0].ts_sfx,
        ts_all: result[0][0].ts_all,
        pr_payrate: result[0][0].pr_payrate,
        qc_payrate: result[0][0].qc_payrate,
        raw_payrate: result[0][0].raw_payrate,
    }
    return result ? res.status(200).send(data) : res.status(404).send({ msg: "Not Found" })

})

router.put('/editseries', async (req, res) => {
    const { channelid } = req.query;
    const body = req.body
    console.log(body)
    // rs
    const query = mysql.format('UPDATE projects_data AS D JOIN projects AS P ON D.sid = P.id SET tl_payrate = ?, cl_bb = ?, cl_sfx = ?, cl_all = ?, ts_bb = ?, ts_sfx = ?, ts_all = ?, pr_payrate = ?, qc_payrate = ?, raw_payrate = ? WHERE D.channel_id = ?', [body.tl_payrate, body.cl_bb, body.cl_sfx, body.cl_all, body.ts_bb, body.ts_sfx, body.ts_all, body.pr_payrate, body.qc_payrate, body.raw_payrate, channelid])
    const result = await con(config).promise().query(query)
    return result ? res.status(200).send(result[0]) : res.status(404).send({ msg: "Not Found" })
})

router.post('/newseries', async (req, res) => {
    const { channelid } = req.query;
    const body = req.body
    console.log(body)
    // rs
    const query0 = mysql.format('SELECT * FROM projects WHERE `shortname` = ? OR `project` = ?', [body.shortname, body.project])
    const result0 = await con(config).promise().query(query0)
    if (result0[0].length > 0) {
        return res.status(409).send({ msg: "Series Naame or abbreviation is alrady exist" })
    } else {
        const query = mysql.format('INSERT INTO projects (`project`, `shortname`, `tl_payrate`, `cl_bb`, `cl_sfx`, `cl_all`, `ts_bb`, `ts_sfx`, `ts_all`, `pr_payrate`, `qc_payrate`, `raw_payrate`) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [body.project, body.shortname, body.tl_payrate, body.cl_bb, body.cl_sfx, body.cl_all, body.ts_bb, body.ts_sfx, body.ts_all, body.pr_payrate, body.qc_payrate, body.raw_payrate])
        const result = await con(config).promise().query(query)
        if (result) {
            const query2 = mysql.format('INSERT INTO projects_data (`sid`, `channel_id`) VALUE (?, ?)', [result[0].insertId, channelid])
            const result2 = await con(config).promise().query(query2)
            return result2 ? res.status(200).send(result2[0]) : res.status(404).send({ msg: "Not Found" })
        } else {
            return res.status(404).send({ msg: "Not Found" })
        }
    }
})


module.exports = router;