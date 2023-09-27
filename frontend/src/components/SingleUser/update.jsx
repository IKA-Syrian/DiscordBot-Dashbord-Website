import React from "react";
import { Formik } from "formik";
// import { Input, Button } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { Buffer } from "buffer";
import { Input, Button } from "@chakra-ui/react";
global.buffer = Buffer;

export function UpdateData({ singleData }) {
  // const [ prefix, setPrefix ] = React.useState("$");

  return (
    <>
      <Formik
        initialValues={singleData}
        onSubmit={(values) => {
          // Handle form submission here
          console.log(values);
        }}
      >
        {
          <form onSubmit={singleData.handleSubmit}>
            <Input
              type="text"
              name="memberid"
              onChange={singleData.handleChange}
              defaultValue={singleData.memberid}
            />
            <Input
              type="text"
              name="project_name"
              onChange={singleData.handleChange}
              defaultValue={singleData.project_name}
            />
            <Input
              type="text"
              name="chapter_number"
              onChange={singleData.handleChange}
              defaultValue={singleData.chapter_number}
            />
            <Input
              type="text"
              name="role"
              onChange={singleData.handleChange}
              defaultValue={singleData.role}
            />
            <Input
              type="text"
              name="adding_points"
              onChange={singleData.handleChange}
              defaultValue={singleData.adding_points}
            />
            <Input
              type="text"
              name="adding_balance"
              onChange={singleData.handleChange}
              defaultValue={singleData.adding_balance}
            />
            <Button type="Update" children="Update Data" />
          </form>
        }
      </Formik>
    </>
  );
}
