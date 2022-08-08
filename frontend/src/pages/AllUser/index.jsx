import React from 'react';
import { getUserDetails, getAllUsers } from '../../utils/api'
const { AllUser } = require('../../components')
const dbDate = require('../../config/config.json')
export function AllUserPage( {
    history,
    match,
}, ) {

    const [ allUsers, setallUsers ] = React.useState(null)
    const [ guildID, setguildID ] = React.useState(match.params.id)
    const [ guild, setGuild ] = React.useState(null)
    const [ loading, setLoading ] = React.useState(true)
    React.useEffect(() => {
        getUserDetails()
            .then(({data}) => {
                console.log(data)
                setGuild(guilds)
                return getAllUsers(match.params.id)
            })
            .then(async ({data}) => {
                console.log(data)
                setallUsers(data)
                setLoading(false)
            })
            .catch((err) => {
                history.push("/")
                setLoading(false)
            })
    }, [])
    const guilds = dbDate.filter(guild => guild.server == match.params.id)
    // console.log(dbDate)
    // console.log(guilds)
    return !loading && (
        <div>
            <h1>Users Page for {`${guild[0].name}`}</h1>
            <AllUser guildID={guildID} allUsers={allUsers}/>
        </div>
    )
}