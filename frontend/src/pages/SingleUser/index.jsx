import React from 'react';
import { SingleUser } from '../../components/';
import { getUserDetails, getUserProfile, getUserRecord } from '../../utils/api'

export function SingleUserPage( { 
    history,
    match
} ) {
    const [ user, setUser ] = React.useState(null)
    const [ loading, setLoading ] = React.useState(true)
    const [ guildID, setguildId ] = React.useState(null)
    const [ userInfo, setUserInfo ] = React.useState(null)
    const [ userRecord, SetUserRecord ] = React.useState(null)
    
    React.useEffect(() => {
        getUserDetails()
            .then( async ({data}) => {
                // console.log(match.params.id, match.params.userid)
                setguildId(match.params.id)
                const data1 = await getUserProfile(match.params.id, match.params.userid)
                const data2 = await getUserRecord(match.params.id, match.params.userid)
                console.log(data1, data2)
                return {data1, data2}
            }).then( ({data1, data2}) => {
                setUserInfo(data1.data)
                SetUserRecord(data2.data)
                setLoading(false)
                // console.log(data1, data2)
            })
            .catch((err) => {
                history.push("/")
                setLoading(false)
            })
    }, [])

    return !loading && (
        <>
            <SingleUser guildID={ guildID } userInfo={ userInfo } userRecord={ userRecord } />
        </>
    )
}