/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useEffect, useState } from 'react'
import Header from '../../components/shared/Layout/Header'
import API from '../../services/API';
import moment from 'moment';

const Analytics = () => {
    const [data, setData] = useState([])
    const [inventoryData, setInventoryData] = useState([])
    const colors = [
        "#435334",
        "#5C5470",
        "#E55604",
        "#94A684",
        "#FFB84C",
        "#0A81AB",
        "#E7AB9A",
        "#15EDA3",
      ];

    //GET BLOOD GROUP DATA
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data")
      if (data?.success) {
        setData(data?.bloodGroupData)
       //  console.log(data);
      }
    } catch (error) {
      console.log(error)
    }
  };

  //lifrecycle method
  useEffect(() => {
    getBloodGroupData();
  }, []);


  //get function
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory")
      if (data?.success) {
        setInventoryData(data?.inventory)
        console.log(data);
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getBloodRecords()
  }, []);

  return (
    <>
      <Header/>
      <div className="d-flex flex-row flex-wrap">
        {data?.map((record, i) => (
          <div
            className="card m-4 p-1"
            key={i}
            style={{ width: "18rem", backgroundColor: `${colors[i]}` }}
          >

            <div className="card-body shadow-lg">
              <h1 className="card-title bg-light text-dark text-center mb-3">
                {record.bloodGroup}
              </h1>
              <p className="card-text">
                Total In : <b>{record.totalIn}</b> (ML)
              </p>
              <p className="card-text">
                Total Out : <b>{record.totalOut}</b> (ML)
              </p>
            </div>
            <div className="card-footer text-light bg-dark text-center">
              Total Available : <b>{record.availabeBlood}</b> (ML)
            </div>
          </div>
        ))}
      </div>
      <div className="container my-3 center"><marquee>
        <h1 className="my-3" style={{color: 'red'}}>Recent Blood Transactions</h1></marquee>
        <table className="table table-light table-striped table-hover ">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Donar Email</th>
              <th scope="col">TIme & Date</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity} (ML)</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Analytics
