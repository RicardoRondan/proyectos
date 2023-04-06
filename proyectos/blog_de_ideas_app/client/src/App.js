import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import Registro from './components/Registro';
import Login from './components/Login';
import ListadoGenerico from './components/ListadoGenerico';
import UnGenerico from './components/UnGenerico';
import UnUsuario from './components/UnUsuario';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				{/* <Navbar /> */}
				<Routes>
					<Route path='/' element={<Registro />} />
					<Route path='/login' element={<Login />} />
					<Route path='/bright_ideas/:id?' element={<ListadoGenerico />} />
					<Route path='/bright/ideas/:id/:id2?' element={<UnGenerico />} />
					<Route path='/users/:nombre/:alias/:email/:id/:id2?' element={<UnUsuario />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
