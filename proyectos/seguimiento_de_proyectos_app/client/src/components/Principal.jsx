import React from 'react'
import Registro from './Registro'
import Login from './Login'


function principal() {
  return (
    <div>
      <div className="principalcontenedor">
          <div id="A">
                <Registro/>
          </div>
          <div id="B">
                <Login/>
           </div>
      </div>     
    </div>
  )
}

export default principal