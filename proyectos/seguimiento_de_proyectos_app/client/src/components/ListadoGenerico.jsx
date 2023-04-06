import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link, NavLink, useNavigate} from 'react-router-dom';

const ListadoGenerico = () => {
    const [lista, setLista] = useState([])  
    
    useEffect(()=>{
        axios.get('http://localhost:8000/api/obtenergenericos')
        .then((res)=>{
            console.log(res);
            setLista(res.data)

        }).catch((err)=>{
            console.log(err);
             
        })
    }, [])

    const BotonMovido = (id, estado) =>{
        
        let estate = estado === 'inicial' ? 'progreso' : estado === 'progreso' ? 'terminar' : estado === 'terminar' ? 'terminado' : null;
       
        if(estate === 'terminado'){
                axios.delete(`http://localhost:8000/api/borrargenerico/${id}`)
                  .then((res)=>{
                  })
                  .catch((err)=>{
                    console.log(err);
                  })
        
        }else{

            axios.put(`http://localhost:8000/api/editargenerico/${id}`,{
            estado: estate
            })
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);               
            })
        }
    }  

    const CambiarFecha = (cadena) =>{
        
        let recorte = cadena.substr(0, 10)
        let d = recorte.substr(8,2)
        let m = recorte.substr(5,2)
        let a = recorte.substr(0,4)

       
        // console.log("Recorte: ",recorte)
        // console.log("Dia :", d)
        // console.log("Mes :", m)
        // console.log("Año :", a)
        // console.log(d+"/"+"/"+m+"/"+a)
        return(d+"/"+m+"/"+a)
    }

    // function invertirCadena(cad) {
    //     return cad.split("").reverse().join("");
    // }
    // invertirCadena("hola");

  return (
       
            <div className='col-10 mx-auto'> 
                <div className="listadoexamen-principal">
                    <p>Project Manager</p>
                    <div id="enlace">
                    
                    </div>
                </div>
                <form className="listadoexamen">
                    <table className="tablaListadoGenerico">
                        <thead>
                            <tr>
                                <th><div id="A">Backlog</div></th>
                                <th><div id="B">In Progress</div></th>
                                <th><div id="C">Completed</div></th>
                            </tr>
                            <tr>

                                <th>    
                                        {
                                            lista.map((lista, indice) => (
                                                <>
                                                    
                                                        {lista.estado === 'inicial' ? (
                                                            <>
                                                                <div className='cuadrito uno' key={indice}>
                                                                    <h2>{lista.nombre}</h2>
                                                                    <p>Due: 
                                                                        {
                                                                        CambiarFecha(lista.fecha)
                                                                        
                                                                        // new Date(lista.fecha)
                                                                        // .toLocaleTimeString([], {
                                                                        //     year: 'numeric',
                                                                        //     month: '2-digit',
                                                                        //     day: '2-digit',
                                                                        //     hour: '2-digit',
                                                                        //     minute: '2-digit',
                                                                        // })
                                                                        // .substring(0, 10)
                                                                        }
                                                                    </p>
                                                                    <button className="btn btn-warning"
                                                                        onClick={() =>
                                                                            BotonMovido(lista._id, lista.estado)
                                                                        }>
                                                                        Start Project
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-forward-fill" viewBox="0 0 16 16">
                                                                            <path d="m9.77 12.11 4.012-2.953a.647.647 0 0 0 0-1.114L9.771 5.09a.644.644 0 0 0-.971.557V6.65H2v3.9h6.8v1.003c0 .505.545.808.97.557z"/>
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </>
                                                        ) : null}
                                                    
                                                </>
                                            ))
                                        }
                                </th>  

                                <th>
                                    {   
                                            lista.map((lista, indice) => (
                                                <>
                                                    
                                                        {lista.estado === 'progreso' ? (
                                                            <>
                                                                <div className='cuadrito dos' key={indice}>
                                                                    <h2>{lista.nombre}</h2>
                                                                    <p>Due: 
                                                                        {
                                                                        CambiarFecha(lista.fecha)

                                                                        // new Date(lista.fecha)
                                                                        // .toLocaleTimeString([], {
                                                                        //     year: 'numeric',
                                                                        //     month: '2-digit',
                                                                        //     day: '2-digit',
                                                                        //     hour: '2-digit',
                                                                        //     minute: '2-digit',
                                                                        // })
                                                                        // .substring(0, 10)
                                                                        }
                                                                    </p>
                                                                    <button className="btn btn-success"
                                                                        onClick={() =>
                                                                            BotonMovido(lista._id, lista.estado)
                                                                        }>
                                                                        Move to Completed
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-forward-fill" viewBox="0 0 16 16">
                                                                            <path d="m9.77 12.11 4.012-2.953a.647.647 0 0 0 0-1.114L9.771 5.09a.644.644 0 0 0-.971.557V6.65H2v3.9h6.8v1.003c0 .505.545.808.97.557z"/>
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </>
                                                        ) : null}
                                                    
                                                </>
                                            ))
                                        }
                                </th>

                                <th>
                                        {   
                                            lista.map((lista, indice) => (
                                                <>
                                                    
                                                        {lista.estado === 'terminar' ? (
                                                            <>
                                                                <div className='cuadrito tres' key={indice}>
                                                                    <h2>{lista.nombre}</h2>
                                                                    <p>Due: 
                                                                        {
                                                                        CambiarFecha(lista.fecha)

                                                                        // new Date(lista.fecha)
                                                                        // .toLocaleTimeString([], {
                                                                        //     year: 'numeric',
                                                                        //     month: '2-digit',
                                                                        //     day: '2-digit',
                                                                        //     hour: '2-digit',
                                                                        //     minute: '2-digit',
                                                                        // })
                                                                        // .substring(0, 10)
                                                                        }
                                                                    </p>
                                                                    <button className="btn btn-danger"
                                                                        onClick={() =>
                                                                            BotonMovido(lista._id, lista.estado)
                                                                        }>
                                                                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                                             <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                                                           </svg>                                                                           
                                                                        Remove Project
                                                                    </button>
                                                                </div>
                                                            </>
                                                        ) : null}
                                                    
                                                </>
                                            ))
                                        }
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={3}>
                                    <div id="E">
                                        
                                        <button className='btn btn-primary'>
                                            <Link to={'/projects/new'}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-rocket-takeoff" viewBox="0 0 16 16">
                                                <path d="M9.752 6.193c.599.6 1.73.437 2.528-.362.798-.799.96-1.932.362-2.531-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532Z"/>
                                                <path d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9.42 9.42 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a9.556 9.556 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093.067.017.12.033.16.045.184.06.279.13.351.295l.029.073a3.475 3.475 0 0 1 .157.721c.055.485.051 1.178-.159 2.065Zm-4.828 7.475.04-.04-.107 1.081a1.536 1.536 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a8.548 8.548 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006ZM5.205 5c-.625.626-.94 1.351-1.004 2.09a8.497 8.497 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107-.04.039Zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a2.835 2.835 0 0 0-.045-.283 3.078 3.078 0 0 0-.3-.041Z"/>
                                                <path d="M7.009 12.139a7.632 7.632 0 0 1-1.804-1.352A7.568 7.568 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z"/>
                                            </svg>
                                                Add New Project
                                            </Link>
                                        </button>
                                        
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
  )
}

export default ListadoGenerico