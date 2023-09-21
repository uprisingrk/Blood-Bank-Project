import React from 'react'   
import { Form } from '../../components/shared/Form/Form'
import {useSelector} from 'react-redux'
import Spinner from './../../components/shared/Spinner';

export const Login = () => {
  const {loading,error} = useSelector(state => state.auth)
  return(
    <>
    {error && <span>{alert(error)}</span>}
    { loading ? <Spinner/> :(
      <div className="row g-0">
        <div className="col-md-8 form-banner">
            <img src='./assests/images/banner1.jpg' alt='login images'/>
        </div>
        <div className="col-md-4 form-container">
        <Form formTitle={'Login'} submitBtn={'Login'} formType={'login'} />
       </div>
      </div>
    )}
    </>
    
  )
}
