import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {io} from 'socket.io-client';
import { useState, useEffect } from 'react';
import ListadoGenerico from './components/ListadoGenerico';
import FormularioGenerico from './components/FormularioGenerico';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ListadoGenerico/>}/>                     
          <Route path='/projects/new' element={<FormularioGenerico/>}/>           
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
