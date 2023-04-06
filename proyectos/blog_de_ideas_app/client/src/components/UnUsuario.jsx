import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UnUsuario = () => {
	const [listas, setListas] = useState([]);
	let contador_posts = 0;
	let contador_likes = 0;
	const { nombre, alias, email, id, id2 } = useParams();
	const navigate = useNavigate();

const logout = (e) => {
	e.preventDefault();
	axios
		.get('http://localhost:8000/api/logout', { withCredentials: true })
		.then((res) => {
			navigate('/');
		})
		.catch((error) => console.log(error));
};

const CargarLista = () => {
	axios
			.get('http://localhost:8000/api/obtenerGenericos', {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res.data.ideas);
				setListas(res.data.ideas);
			})
			.catch((err) => {
				console.log(err);
			});
};
CargarLista();

	return (
		<div className='col-10 mx-auto'>
			<div className='unusuarioexamen-principal'>
				{/* <p>Register</p> */}
				<div id='enlace'>
					<div>
						<Link to={`/bright_ideas/${id2}`}>Bright Ideas</Link>
					</div>
					<div>
						<Link onClick={logout}>Logout</Link>
					</div>
				</div>
			</div>
			<p>Name: {nombre}</p>
			<p>Alias:{alias}</p>
			<p>Email:{email}</p>
			<hr></hr>
			
			{listas?.map((lista) => {
				if(lista.creador._id === id ){ 	
					contador_posts += 1 ;			
				}	
				
				for (const value of lista.likes) {
					if(value === id ){ 	
						contador_likes += 1 ;			
					}
				}	
			})}
			<p>{`Total Number of Posts: ${contador_posts}`}</p>
			<p>{`Total Number of Likes: ${contador_likes}`}</p>
		</div>
	);
};

export default UnUsuario;
