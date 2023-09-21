import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import API from '../../services/API'
import moment from 'moment'

const Donar = () => {
    const [data,setData] = useState([])
    //find Donar record
    const getDonars = async()=>{
        try {
            const {data}=await API.get('/inventory/get-donars')
            //  console.log(data)
           if(data?.success){
            setData(data?.donars)
           }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getDonars()
    },[])


  return (
    <Layout>
    <div className=" container mt-5">
      <table className="table table-success table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile No.</th>
                <th scope="col">Date & Time</th>
              </tr>
            </thead>
            <tbody>
            {data?.map(record =>(
              <tr key={record._id}>
                <td>{record.name || record.organisationName + " ORG"}</td>
               <td>{record.email}</td>     
               <td>{record.phone}</td>  
                <td>{moment(record.createdAt).format('DD/MM/YYYY  hh:mm:ss A')}</td>
              
              </tr>
                           
            ))}
            </tbody>
          </table>
          </div>
    </Layout>
  )
}

export default Donar
