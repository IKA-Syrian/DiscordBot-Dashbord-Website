function getMutualGuilds( userGuilds, botGuilds, userID ){
    if(userID == 550273901788135424){
        return userGuilds.filter((guild) => botGuilds.find((botGuild) => (botGuild.id === guild.id)))
    }else{
        return userGuilds.filter((guild) => botGuilds.find((botGuild) => (botGuild.id === guild.id) && (guild.permissions & 0x20) === 0x20))
    }
    
}

module.exports = { getMutualGuilds }