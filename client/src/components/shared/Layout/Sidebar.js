import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../../../styles/Layout.css'

const Sidebar = () => {
  //get User State
  const {user} =useSelector(state=>state.auth)
    const location = useLocation()
  return (
    <>
      <div className="sidebar">
        <div className="menu">
       {user?.role === 'organisation' && (
        <>

        <div className={`menu-item ${location.pathname === '/' && 'active'}`}>
             <i className="fa-solid fa-warehouse fa-fade"></i>
             <Link to="/">Inventory</Link>
          </div> 

          <div className={`menu-item ${location.pathname === '/donar' && 'active'}`}>
             <i className="fa-solid fa-hand-holding-medical fa-fade"></i>
             <Link to="/donar">Donar</Link>
          </div> 

          <div className={`menu-item ${location.pathname === '/hospital'  && 'active'}`}>
             <i className="fa-solid fa-hospital fa-fade"></i>
             <Link to="/hospital">Hospital</Link>
          </div>
        </>
       )}

       {user?.role === 'admin' && (
        <>

        <div className={`menu-item ${location.pathname === '/donar-list' && 'active'}`}>
             <i className="fa-solid fa-warehouse fa-fade"></i>
             <Link to="/donar-list">Donar List</Link>
          </div> 

          <div className={`menu-item ${location.pathname === '/hospital-list' && 'active'}`}>
             <i className="fa-solid fa-hand-holding-medical fa-fade"></i>
             <Link to="/hospital-list">Hospital List</Link>
          </div> 

          <div className={`menu-item ${location.pathname === '/org-list'  && 'active'}`}>
             <i className="fa-solid fa-hospital fa-fade"></i>
             <Link to="/org-list">Organosation List</Link>
          </div>

        </>
       )}


        
           {(user?.role === 'donar' || user?.role === 'hospital') && (
            <div className={`menu-item ${location.pathname === '/organisation'  && 'active'}`}>
             <i className="fa-sharp fa-solid fa-building-ngo fa-fade"></i>
             <Link to="/organisation">Organisation</Link>
          </div>
           )}
           
           {user?.role === 'hospital' && (
          <div className={`menu-item ${location.pathname === '/consumer'  && 'active'}`}>
          <i className="fa-sharp fa-solid fa-building-ngo fa-fade"></i>
          <Link to="/consumer">Consumer</Link>
          </div>
          )}
           
          {user?.role === 'donar' && (
          <div className={`menu-item ${location.pathname === '/donation'  && 'active'}`}>
          <i className="fa-sharp fa-solid fa-building-ngo fa-fade"></i>
          <Link to="/donation">Donation</Link>
          </div>
          )}

        </div>
      </div>
    </>
  )
}

export default Sidebar
