import React from 'react';
import { Formik } from 'formik';
// import { Input, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { Buffer } from 'buffer'
import { Input, Button } from '@chakra-ui/react';
global.buffer = Buffer

export function UpdateData( { history, singleDate} ){
    // const [ prefix, setPrefix ] = React.useState("$");

    return(
        <>
            <Formik
                initialValues={{ singleDate }}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {
                    singleDate.map((props) => {
                        <form onSubmit={props.handleSubmit}>
                            <Input type="text" name="memberid" onChange={props.handleChange} defaultValue={singleDate.memberid}/>
                            <Input type="text" name="project_name" onChange={props.handleChange} defaultValue={singleDate.project_name}/>
                            <Input type="text" name="chapter_number" onChange={props.handleChange} defaultValue={singleDate.chapter_number}/>
                            <Input type="text" name="role" onChange={props.handleChange} defaultValue={singleDate.role}/>
                            <Input type="text" name="adding_points" onChange={props.handleChange} defaultValue={singleDate.adding_points}/>
                            <Input type="text" name="adding_balance" onChange={props.handleChange} defaultValue={singleDate.adding_balance}/>
                            <Button type="Update" children="Update Data" />
                        </form>
                    })
                }
                
            </Formik>
        </>
    )

}