import React from 'react'

const Footer = () => {
  return (
    <>
     <footer className="text-center text-white " style={{backgroundColor: '#21081a'}}>
  {/* Grid container */}
  <div className="container p-4" />
  {/* Grid container */}
  {/* Copyright */}
  <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
    © 2020 Copyright:
    <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
  </div>
  {/* Copyright */}
</footer>

    </>
  )
}

export default Footer
