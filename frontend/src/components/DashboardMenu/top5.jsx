import React from 'react';
import { Formik } from 'formik';
// import { Input, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { Buffer } from 'buffer'
global.buffer = Buffer

export function GetTop( { history,
    guildID,
    top5 } ) {
        switch(guildID){
            case "699320430934098030" :
                return (
                    <>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Counts</th>
                            <th>Balance</th>
                            <th>Total Balance</th>
                            <th>Paid Status</th>
                            <th>More Details</th>
                        </tr>
                        {
                            top5.map((data) => (
                                <tr>
                                    <td>{data.id}</td>
                                    <td>{data.account_id}</td>
                                    <td>{Buffer.from(data.account_name).toString()}</td>
                                    <td>{data.count}</td>
                                    <td>{data.balance}</td>
                                    <td>{data.total_balance}</td>
                                    <td>{data.paid_status}</td>
                                    <td>
                                        <Link to={`/dashboard/${guildID}/user/${data.account_id}`}>View Details</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </>
                )
            case "777493917440016405":
                return (
                    <>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Balance</th>
                            <th>More Details</th>
                        </tr>
                        {
                            top5.map((data) => (
                                <tr>
                                    <td>{data.id}</td>
                                    <td>{data.account_id}</td>
                                    <td>{Buffer.from(data.account_name).toString()}</td>
                                    <td>{data.count}</td>
                                    <td>
                                        <Link to={`/dashboard/${guildID}/user/${data.account_id}`}>View Details</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </>
                )
            case "770652852871888916":
                return (
                    <>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Balance</th>
                            <th>More Details</th>
                        </tr>
                        {
                            top5.map((data) => (
                                <tr>
                                    <td>{data.id}</td>
                                    <td>{data.account_id}</td>
                                    <td>{Buffer.from(data.account_name).toString()}</td>
                                    <td>{data.count}</td>
                                    <td>
                                        <Link to={`/dashboard/${guildID}/user/${data.account_id}`}>View Details</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </>
                )
            default :
                return (
                    <>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Counts</th>
                            <th>More Details</th>
                        </tr>
                        {
                            top5.map((data) => (
                                <tr>
                                    <td>{data.id}</td>
                                    <td>{data.account_id}</td>
                                    <td>{Buffer.from(data.account_name).toString()}</td>
                                    <td>{data.count}</td>
                                    <td>
                                        <Link to={`/dashboard/${guildID}/user/${data.account_id}`}>View Details</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </>
                )
        }
    
}