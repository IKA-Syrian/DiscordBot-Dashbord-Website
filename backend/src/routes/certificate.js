const router = require('express').Router();
// const { getBotGuilds } = require("../utils/api")
const User = require("../database/schema/User")
const { getMutualGuilds } = require("../utils/utils")
const config = require("../database/config.json")
const con = require("../database/mysql")

router.get("/query", async (req, res) => {
    const { name, data } = req.query;
    if(name){
        const result = await con(config[0].data).promise().query(`SELECT * FROM certificates WHERE username LIKE '%${name}%'`)
        return result ? res.status(200).send(result[0][0]) : res.status(404).send({ msg: "Not Found" })
    }else if(data){
        const result = await con(config[0].data).promise().query(`SELECT * FROM certificates WHERE data LIKE '%${data}%'`)
        return result ? res.status(200).send(result[0][0]) : res.status(404).send({ msg: "Not Found" })
    }
})

router.post('/newCertificate', async (req, res) => {
    let FullData = req.query;
    const { data, username, position, degree } = FullData;
    console.log(req.query)
    const QRUrl = `https://bot.golden-manga.com/QR/${data}.png`
    const finalCertificate = `https://bot.golden-manga.com/certificate/${data}.jpeg`
    FullData.QRUrl = QRUrl;
    FullData.finalCertificate = finalCertificate;
    try{
        const query = await con(config[0].data).promise().query(`INSERT INTO certificates (data, username, position, degree, QRUrl, certificate) VALUES ('${data}', '${username}', '${position}', '${degree}', '${QRUrl}', '${finalCertificate}')`)
        console.log(query[0])
        return res.status(200).send(FullData)
    }catch(err){
        console.error(err)
        return res.status(400).send(err)
    }
    

})

module.exports = router;