import React from 'react';
import { Formik } from 'formik';
import { Input, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { GetTop } from './top5';
import { GetLast5 } from './last5';
import { GetLatist5Series } from './latestSeries';

export function DashboardMenu( { 
    history,
    guildID,
    top5,
    last5,
    latestseries
} ) {
    
    // eslint-disable-next-line no-unused-vars
    const [ prefix, setPrefix ] = React.useState("$");

    return (
        <div>
            <Formik
                initialValues={{ prefix }}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {
                    (props) => (
                        <form onSubmit={props.handleSubmit}>
                            <Input type="text" name="prefix" onChange={props.handleChange} defaultValue={prefix}/>
                            <Button type="submit" children="Update prefix" />
                        </form>
                    )
                }
                
            </Formik>
            <div>
                <table>
                    <GetTop guildID={ guildID } top5={ top5 }  />
                </table>
                <Link to={`/dashboard/${guildID}/users/all`} className="user-button">View All Users</Link>
            </div>
            <div>
                <table>
                    
                    <GetLast5 guildID={ guildID } last5={ last5 } />
                </table>
                <Link to={`/dashboard/records/${guildID}/all`} className="record-button">View All Records</Link>
            </div>
            <div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Series Name</th>
                        <th>Channel ID</th>
                        <th>Role ID</th>
                        <th>Series ShortName</th>
                        <th>Series LVL</th>
                    </tr>
                    <GetLatist5Series latestseries={ latestseries }/>
                </table>
                <Link to={`/dashboard/series/${guildID}/all`} className="series-button">View All Series</Link>
            </div>
        </div>
    )
}