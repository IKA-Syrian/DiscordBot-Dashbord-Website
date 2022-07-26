require('dotenv').config()
const router = require('express').Router();
const { getBotGuilds } = require("../utils/api")
const User = require("../database/schema/User")
const { getMutualGuilds } = require("../utils/utils")
const mysql = require("mysql2")
const con = require("../database/bookmark-sql")
const fetch = require("node-fetch")
const axios = require("axios")
// const discord = require('discord.js')
// const token = process.env.DASHBOARD_BOT_TOKEN
// const client = new discord.Client({fetchAllMembers:true})
// const PORT = process.env.PORT || 3002;
// client.login(token)
router.get('/', async (req, res) => {
    const id = req.query.id
    console.log(id)
    const result = await con.promise().query(`SELECT * FROM works WHERE manga_id = ${id}`)
    if(result[0][0] == null){
        res.sendStatus(404)
    }else{
        res.status(200).send(result[0][0])
    }
})

// // 3054
// router.post('/new', async (req, res) => { 
//     if(req.query.id){
//         // console.log(req.query.id)
//         // res.sendStatus(200)
//         var control = 0
//         const result = await axios.get(`http://localhost:3001/api/series?id=${req.query.id}`, { 
//             withCredentials: true,
//         }).catch(err => {
//             console.log(err.response.status)
//             control = 1
//             // res.sendStatus(500)
//         })
//         if(control == 0){
//             const status = result.request.res.statusCode
//             console.log(status)
//             if(status == 200){
//                 res.status(409).send({msg: "Already exists"})
//             }
//         }else if(control == 1){
//             console.log("Error")
//             const response = await fetch(`https://golden-manga.com/api/mangas/${req.query.id}`)
//             const json = await response.json()
//             console.log(json.mangaData.title)
//             const channel = client.channels.cache.get("988225004619575326");
//             // client.on("ready", async () => {
//             //     console.log(client.user.tag + " is online now!");
//                 const Embed = new discord.MessageEmbed()
//                 Embed.setTitle("**عمل جديد يضاف للموقع**")
//                 // Embed.setURL(`https://golden-manga.com/mangas/${req.query.id}`)
//                 var categoriesName = []
//                 if(json.mangaData.categories.length == 0){
//                     categoriesName[0] = "لا يوجد"
//                 }else{
//                     for(let i = 0; i < json.mangaData.categories.length; i++){
//                         //console.log(body.mangaData.categories[i].name)
//                         if(i === 0){
//                             categoriesName[i] = `${json.mangaData.categories[i].name}`
//                         }else{
//                             categoriesName[i] = `${json.mangaData.categories[i].name}`
//                         }
//                     }
//                 }
//                 console.log(categoriesName)
//                 const categorieName = categoriesName.toString().replace(/,/g, "، ")
//                 Embed.addFields([{
//                     name: "**• - - - - - - - اسم العمل - - - - - - - •**",
//                     value: json.mangaData.title
//                 },{
//                     name: "**• - - - - - - - نوع العمل - - - - - - - •**",
//                     value: `${json.mangaData.type.title} ${json.mangaData.type.name}`
//                 },{
//                     name: "**• - - - - - - - تصنيفات العمل - - - - - - - •**",
//                     value: categorieName
//                 },{
//                     name: "**• - - - - - - - قصة العمل - - - - - - - •**",
//                     value: json.mangaData.summary
//                 },{
//                     name: "**• - - - - - - - رابط العمل - - - - - - - •**",
//                     value: `[لزيارة صفحة العمل من هنا](https://golden-manga.com/mangas/${req.query.id})`
//                 }])
//                 // Embed.setDescription(json.mangaData.summary)
//                 Embed.setImage(`https://golden-manga.com/uploads/manga/cover/${json.mangaData.id}/${json.mangaData.cover}`)
//                 Embed.setColor("#FFD700")
//                 Embed.setTimestamp()
//                 Embed.setFooter("Golden Manga", "https://golden-manga.com/assets/product/goldenManga/logo.png")
//                 // console.log(channel)
//                 // console.log(`https://golden-manga.com/uploads/manga/cover/${json.mangaData.id}/${json.mangaData.cover}`)
//                 channel.send(Embed)
//                 const result = await con.promise().query('INSERT INTO works (`manga_id`, `name`) VALUES (?, ?)', [json.mangaData.id, json.mangaData.title])
//                 // if(result[0][0] == null){
//                     // res.sendStatus(404)
//                 // }else{
//                     res.status(200).send({
//                         msg: "Successfully added"
//                     })
//                     res.end()
//                 // }
//             // })
//             // client.login(token)
//             // res.sendStatus(500)
//         }
//         // console.log(result)client.login(token)
//         // const status = result.request.res.statusCode
//         // console.log(result.request.res.statusCode)
//         // res.send(result.data)
//     }
// })
// router.listen(PORT, async () => {
    
// })
module.exports = router;