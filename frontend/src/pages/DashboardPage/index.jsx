import React from 'react';
import { getUserDetails, getTopUsers, getLast5, getLast5Series } from '../../utils/api'
const { DashboardMenu } = require('../../components')
export function DashboardPage( { history, match } ) {

    const [ user, setUser ] = React.useState(null)
    const [ loading, setLoading ] = React.useState(true)
    const [ top5 , setTop5 ] = React.useState(null)
    const [ last5 , setLast5 ] = React.useState(null)
    const [ latestseries , setLast ] = React.useState(null)
    const [ guildID, setguildId ] = React.useState(null)
    React.useEffect(() => {
        getUserDetails()
            .then( async ({data}) => {
                console.log(data)
                setUser(data)
                console.log(match.params.id)
                const data1 = await getTopUsers(match.params.id);
                const data2 = await getLast5(match.params.id);
                const data3 = await getLast5Series(match.params.id);
                const data4 = match.params.id;
                console.log(data1, data2, data3, data4);
                return {data1, data2, data3, data4};
            })
            .then( ({data1, data2, data3, data4}) => {
                console.log(data4)
                setguildId(data4)
                setTop5(data1.data)
                setLast5(data2.data)
                setLast(data3.data)
                setLoading(false) 
            })
            .catch((err) => {
                history.push("/")
                setLoading(false)
            })
    }, [])
    React.useEffect(() => {
        
    }, [])
    return !loading && (
        <div>
            <h1>Dashboard Page</h1>
            <DashboardMenu guildID={guildID} top5={ top5 } last5={ last5 } latestseries={ latestseries }/>
            {/* <getTop top5={ top5 } /> */}
        </div>
    )
}