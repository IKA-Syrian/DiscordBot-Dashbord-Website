import React from "react";
import { Formik } from "formik";
// import { Input, Button } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { Buffer } from "buffer";
import { Button } from "@chakra-ui/react";
import { UpdateData } from "./update";
global.buffer = Buffer;

export function GetRecords({ history, guildID, userRecord }) {
  function converttolocal(date) {
    const dateToTime = (date) =>
      date.toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    const dateString = date;
    const localDate = new Date(dateString);
    return dateToTime(localDate);
  }
  const [singleData, setSingleData] = React.useState(null);
  const updateData1 = (data) => {
    console.log("updateData1:", data);
    console.log("Before setting singleData:", singleData);
    const ddata = userRecord.map((RecordData) => {
      if (RecordData.id === data) {
        return setSingleData(RecordData);
      }
    });
    console.log("After setting singleData:", singleData);
    return ddata ? <UpdateData singleData={singleData} /> : singleData;
  };
  const deleteData = (data) => {
    // return data.id == data.id ? <UpdateData singleData={singleData}/> : data
  };
  switch (guildID) {
    case "699320430934098030":
      return (
        <>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>User Name</th>
            <th>Series ShortName</th>
            <th>Chapter Number</th>
            <th>Position</th>
            <th>Adding Points</th>
            <th>Adding Balance</th>
            <th>Date</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
          {userRecord.map((data) => (
            <tr>
              <td>{RecordData.id}</td>
              <td>{RecordData.member_id}</td>
              <td>{Buffer.from(data.member).toString().trim()}</td>
              <td>{RecordData.project_name}</td>
              <td>{RecordData.chapter_number}</td>
              <td>{RecordData.role}</td>
              <td>{RecordData.adding_points}</td>
              <td>{RecordData.adding_balance} </td>
              <td>{converttolocal(data.date)}</td>
              <td>
                <Button
                  id={RecordData.id}
                  onClick={() => updateData1(RecordData.id)}
                >
                  Update
                </Button>
              </td>
              {/* <td>
                <Button onClick={deleteData(data.id)}>Delete</Button>
              </td> */}
              <br />
            </tr>
          ))}
        </>
      );
    case "777493917440016405":
      return (
        <>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>User Name</th>
            <th>Series ShortName</th>
            <th>Chapter Number</th>
            <th>Position</th>
            <th>Adding Points</th>
            <th>Page Counts</th>
            <th>Date</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
          {userRecord.map((data) => (
            <tr>
              <td>{RecordData.id}</td>
              <td>{RecordData.member_id}</td>
              <td>{Buffer.from(data.member).toString().trim()}</td>
              <td>{RecordData.project_name}</td>
              <td>{RecordData.chapter_number}</td>
              <td>{RecordData.role}</td>
              <td>{RecordData.adding_points}</td>
              <td>{RecordData.page_count}</td>
              <td>{converttolocal(data.date)}</td>
              <td>
                <Button
                  id={RecordData.id}
                  onClick={() => updateData1(RecordData.id)}
                >
                  Update
                </Button>
              </td>
              {/* <td>
                <Button
                  onClick={setSingleData(data).then(() => deleteData(data.id))}
                >
                  Delete
                </Button>
              </td> */}
              <br />
            </tr>
          ))}
        </>
      );
    case "770652852871888916":
      return (
        <>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>User Name</th>
            <th>Series ShortName</th>
            <th>Chapter Number</th>
            <th>Position</th>
            <th>Adding Points</th>
            <th>Page Counts</th>
            <th>Date</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
          {userRecord.map((data) => (
            <tr>
              <td>{RecordData.id}</td>
              <td>{RecordData.member_id}</td>
              <td>{Buffer.from(data.member).toString().trim()}</td>
              <td>{RecordData.project_name}</td>
              <td>{RecordData.chapter_number}</td>
              <td>{RecordData.role}</td>
              <td>{RecordData.adding_points}</td>
              <td>{RecordData.page_count}</td>
              <td>{converttolocal(data.date)}</td>
              <td>
                <Button
                  id={RecordData.id}
                  onClick={() => updateData1(RecordData.id)}
                >
                  Update
                </Button>
              </td>
              {/* <td>
                <Button
                  onClick={setSingleData(data).then(() => deleteData(data.id))}
                >
                  Delete
                </Button>
              </td> */}
              <br />
            </tr>
          ))}
        </>
      );
    default:
      return (
        <>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>User Name</th>
            <th>Series ShortName</th>
            <th>Chapter Number</th>
            <th>Position</th>
            <th>Adding Points</th>
            <th>Page Counts</th>
            <th>Date</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
          {userRecord.map((RecordData) => (
            <tr key={RecordData.id}>
              <td>{RecordData.id}</td>
              <td>{RecordData.member_id}</td>
              <td>{Buffer.from(RecordData.member).toString().trim()}</td>
              <td>{RecordData.project_name}</td>
              <td>{RecordData.chapter_number}</td>
              <td>{RecordData.role}</td>
              <td>{RecordData.adding_points}</td>
              <td>{RecordData.page_count}</td>
              <td>{converttolocal(RecordData.date)}</td>
              <td>
                <Button
                  id={RecordData.id}
                  onClick={() => updateData1(RecordData.id)}
                >
                  Update
                </Button>
              </td>
              {/* <td><Button onClick={setSingleData(data)}>Delete</Button></td> */}
              <br />
            </tr>
          ))}
        </>
      );
  }
}
