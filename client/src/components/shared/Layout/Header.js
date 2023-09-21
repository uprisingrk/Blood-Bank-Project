import React from 'react'
import {BiSolidDonateBlood} from 'react-icons/bi'
import {AiOutlineLogout,AiFillHome} from 'react-icons/ai'
import {FaUserTie} from 'react-icons/fa'
import {SiGoogleanalytics} from 'react-icons/si'
import { useSelector } from 'react-redux'
import {useLocation, useNavigate,Link} from 'react-router-dom'


const Header = () => {
    const {user} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const location = useLocation()
    //logout handler
    const handleLogout =() =>{
        localStorage.clear()
        alert('Logout Successfully')
        navigate('/login')
        
    }
  return (
    <>
      <nav className="navbar navbar-expand-lg py-1"  style={{backgroundColor: "#485f5c"}}>
      <div className="container-fluid">
      <div className="navbar-brand h1"><BiSolidDonateBlood color='red'size='40'/> Blood Bank</div>
      <ul className="navbar-nav flex-row">
      {
         location.pathname === '/' || location.pathname === '/donar' || location.pathname === '/hospital' || location.pathname === '/admin' ?(
          <li className="nav-item mx-1 ">
            <Link to='/analytics' className="nav-link">
            <button className='btn btn-danger'> <SiGoogleanalytics/> Analytics </button>
            </Link>
        </li>
        ):(<li className="nav-item mx-1">
            <Link to='/' className="nav-link">
            <button className='btn btn-success'> <AiFillHome/> Home </button>
            </Link>
        </li>)
      }
        <li className="nav-item mx-3 my-2">
            <p className="nav-link h1 bg-light round">
            {/* Here ? is same as (user && user.name) i.e if user and get user name */}
                <FaUserTie color='black'/> Welcome {user?.name ||user?.hospitalName ||user?.organisationName} &nbsp;
            <span className='badge bg-warning'>{user?.role}</span>
            </p>
        </li>


        <li className="nav-item mx-3 my-2">
         <button className="btn btn-info " onClick={handleLogout}><AiOutlineLogout/> Logout</button>
        </li>
      </ul>
      </div>
      </nav>
    </>
  )
}

export default Header
