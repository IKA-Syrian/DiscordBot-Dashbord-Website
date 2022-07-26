import axios from 'axios'

export function getUserDetails(){
    return axios.get("https://site.golden-manga.com/api/auth", { 
        withCredentials: true,   
    })
}

export function getGuilds(){
    return axios.get("https://site.golden-manga.com/api/discord/guilds", { 
        withCredentials: true,   
    })
}

export function getTopUsers(guildId){
    return axios.get(`https://site.golden-manga.com/api/discord/guilds/${guildId}/top`, { 
        withCredentials: true,   
    })
}

export function getAllUsers(guildId){
    return axios.get(`https://site.golden-manga.com/api/discord/guilds/${guildId}/all`, { 
        withCredentials: true,   
    })
}

export function getLast5(guildId){
    return axios.get(`https://site.golden-manga.com/api/discord/guilds/${guildId}/last5`, { 
        withCredentials: true,   
    })
}

export function getLast5Series(guildId){
    return axios.get(`https://site.golden-manga.com/api/discord/guilds/${guildId}/last5series`, { 
        withCredentials: true,   
    })
}

export function getUserProfile(guildId, userID){
    return axios.get(`https://site.golden-manga.com/api/discord/guilds/${guildId}/userprofile?userid=${userID}`, { 
        withCredentials: true,   
    })
}

export function getUserRecord(guildId, userID, month){
    if(!month){
        return axios.get(`https://site.golden-manga.com/api/discord/guilds/${guildId}/userrecord?userid=${userID}`, { 
            withCredentials: true,   
        })
    }else{
        return axios.get(`https://site.golden-manga.com/api/discord/guilds/${guildId}/userrecord?userid=${userID}&month=${month}`, {  
            withCredentials: true,   
        })
    }
    
}