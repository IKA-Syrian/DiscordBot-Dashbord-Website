import React from 'react';
import { Formik } from 'formik';
import { Input, Button } from '@chakra-ui/react';
import { GetInfo } from './info';
import { GetRecords } from './reacords';
// import { GetLatist5Series } from './latestSeries';

export function SingleUser( { 
    history,
    guildID,
    userInfo,
    userRecord
} ) {
    
    // eslint-disable-next-line no-unused-vars
    const [ prefix, setPrefix ] = React.useState("$");

    return (
        <>
            <div>
                <table>
                    <GetInfo guildID={ guildID } userInfo={ userInfo } />
                </table>
            </div>
            <div>
                <table>
                    <GetRecords guildID={ guildID } userRecord={ userRecord } />
                </table>
            </div>
            
        </>
    )
}