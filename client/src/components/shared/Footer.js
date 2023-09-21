import React from 'react'

const Footer = () => {
  return (
    <>
     <footer className="text-center text-white fixed-bottom " style={{backgroundColor: '#22081a'}}>
  {/* Grid container */}
  {/* <div className="container p-5" /> */}
  {/* Grid container */}
  {/* Copyright */}
  <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
    © 2023 Copyright:
    <div onClick={(e) => {window.location.href ='mailto:example@email.com';}}>any thing here </div>
    <a className="text-white" href="mailto:kumarraushan40800@gmail.com"> My EMail</a>
  </div>
  {/* Copyright */}
</footer>

    </>
  )
}

export default Footer
