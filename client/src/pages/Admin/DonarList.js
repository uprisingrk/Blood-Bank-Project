import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import API from '../../services/API'
import moment from 'moment'
import {AiFillDelete} from 'react-icons/ai'


const DonarList = () => {
    const [data,setData] = useState([])
    //find Donar record
    const getDonars = async()=>{
        try {
            const {data}=await API.get('/admin/donar-list')
            // console.log(data)
           if(data?.success){
            setData(data?.donarData)
           }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getDonars()
    },[])

    //DELETE FUNCTION
  const handelDelete = async (id) => {
    try {
      let answer = window.confirm("Do you want to delete this Donar");
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-donar/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error); 
    }
  };

  return (
    <Layout>
    <table className="table table-hover table-light">
          <thead>
            <tr>
              <th scope="col">Donar Name</th>
              <th scope="col">Donar Email</th>
              <th scope="col">Mobile No.</th>
              <th scope="col">Date & Time</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {data?.map(record =>(
            <tr key={record._id}>
              <td>{record.name || record.organisationName + " ORG"}</td>
             <td>{record.email}</td>     
             <td>{record.phone}</td>  
              <td>{moment(record.createdAt).format('DD/MM/YYYY  hh:mm:ss A')}</td>
              <td><div className="btn btn-danger" title='Delete Record' onClick={() => handelDelete(record._id)}><AiFillDelete/></div></td> 
            
            </tr>
          ))}
          </tbody>
        </table>
  </Layout>
  )
}

export default DonarList
