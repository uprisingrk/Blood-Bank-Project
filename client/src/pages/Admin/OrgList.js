import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import moment from 'moment'
import API from '../../services/API'
import {AiFillDelete} from 'react-icons/ai'


const OrgList = () => {
    const [data,setData] = useState([])
    //find Donar record
    const getDonars = async()=>{
        try {
            const {data}=await API.get('/admin/org-list')
            // console.log(data)
           if(data?.success){
            setData(data?.orgData )
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
      let answer = window.confirm("Do you want to delete this Hospital");
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-donar/${id}`); //delete is commom for all catagory
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
              <th scope="col">Org Name</th>
              <th scope="col">Org Email</th>
              <th scope="col">Mobile No.</th>
              <th scope="col">Date & Time</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {data?.map(record =>(
            <tr key={record._id}>
              <td>{record.organisationName}</td>
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

export default OrgList
