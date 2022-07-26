import React from 'react';
import { Formik } from 'formik';
// import { Input, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { Buffer } from 'buffer'
global.buffer = Buffer

export function GetLatist5Series( { 
    history,
    latestseries } ) {
    // function converttolocal(date){
    //     const dateToTime = date => date.toLocaleString('en-US', {
    //         year: 'numeric',
    //         month: 'numeric',
    //         day: 'numeric',
    //         hour: 'numeric',
    //         minute: 'numeric'
    //     });
    //     const dateString = date;
    //     const localDate = new Date(dateString);
    //     return dateToTime(localDate)
    // }
    return (
        <>
            {
                latestseries.map((data) => (
                    <tr>
                        <td>{data.id}</td>
                        <td>{data.project}</td>
                        <td>{data.channel_id}</td>
                        <td>{data.role_id}</td>
                        <td>{data.shortname}</td>
                        <td>{data.level}</td>

                        {/* <td>{data.adding_points}</td>
                        
                        <td>{data.balance}  </td>
                        <td>{converttolocal(data.date)}</td> */}
                        <br/>
                    </tr>
                ))
            }
        </>
    )
}