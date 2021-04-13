import React from 'react'
import './index.css'

const AuthenticationModal = ({ children }) => {
  return (
    <section>
      <div className='container'>
        <div className="left">
        </div>
        <div className="right">
          <div className="content">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthenticationModal
