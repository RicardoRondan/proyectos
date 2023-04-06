import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Registro = () => {

    const[nombre, setNombre] = useState('')
    const[apellido, setApellido] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[confirmpassword, setConfirmPassword] = useState('')

    const[errors, setErrors] = useState({})

    //Redireccionar a otra página
    const navigate = useNavigate();

    //Evitar que la página se refresque al presionar el botón
    const submitHandler = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/registro',{
          nombre,
          apellido,
          email,
          password,
          confirmpassword
        }, {withCredentials:true, credentials:'include'})
          .then((res)=>{
            console.log(res);
            navigate('/')
          })
          .catch((err)=>{
            console.log(err);
            setErrors(err.response.data.errors)
          })
    }

  return (
    <div className='col-10 mx-auto'>        
        <form onSubmit={submitHandler} className="registroyloginformulario">       
          <fieldset>
              <legend>Register</legend>

              <div className="row mb-3">
                <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">First Name</label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" onChange={(e)=>setNombre(e.target.value)}/> 
                  {errors.nombre ? <span className='text-danger'> {errors.nombre.message}</span> : null }<br></br>
                </div>
              </div>
              
              <div className="row mb-3">
                <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Last Name</label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" onChange={(e)=>setApellido(e.target.value)}/> 
                  {errors.apellido ? <span className='text-danger'> {errors.apellido.message}</span> : null }<br></br>
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Email</label>
                <div className="col-sm-7">
                  <input type="email" className="form-control" onChange={(e)=>setEmail(e.target.value)}/> 
                  {errors.email ? <span className='text-danger'> {errors.email.message}</span> : null }<br></br>
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Password</label>
                <div className="col-sm-7">
                  <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)}/> 
                  {errors.password ? <span className='text-danger'> {errors.password.message}</span> : null }<br></br>
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Confirm Password</label>
                <div className="col-sm-7">
                  <input type="password" className="form-control" onChange={(e)=>setConfirmPassword(e.target.value)}/> 
                  {/* {errors.password ? <span className='text-danger'> {errors.password.message}</span> : null }<br></br> */}
                </div>
              </div>
              
              <div className="row mb-3">
                <div>
                  <button className='btn btn-success col-10'>Submit</button>
                </div>
              </div>
            </fieldset>
        </form>
    </div>
  )
}

export default Registro