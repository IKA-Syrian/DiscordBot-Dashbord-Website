const fetch = require("node-fetch")
// import fetch from 'node-fetch';

const token = process.env.DASHBOARD_BOT_TOKEN
async function getBotGuilds(){
    const response = await fetch("http://discord.com/api/v9/users/@me/guilds",{
        method: "GET",
        headers: {
            Authorization: `Bot ${token}`
        }
    })
    return response.json();
}


module.exports = { getBotGuilds }