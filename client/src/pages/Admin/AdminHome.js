import React from 'react'
import Layout from '../../components/shared/Layout/Layout'
import { useSelector } from "react-redux";

const AdminHome = () => {
    const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
     <div className="container">
        <div className="d-felx flex-column mt-4">
          <h1>
            Welcome Admin <i className="text-success">{user?.name}</i>
          </h1>
          <h3>Manage Blood Bank</h3>
          <hr />
          <p>
          A blood donation app is a web application designed to facilitate and 
          streamline the process of blood donation and blood collection. 
          These apps serve as a bridge between blood donors, blood banks, and 
          recipients, making it easier for individuals to donate blood, 
          for blood banks to manage their inventory, and for patients to
           find and receive the blood they need.
           Additionally, it's essential to focus on user privacy and 
           data security to build trust among donors and partners. 
           Such apps have the potential to save lives and play a crucial 
           role in healthcare systems worldwide.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default AdminHome
