import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ListadoGenerico = () => {
	const [listas, setListas] = useState([]);
	const [idea, setIdea] = useState('');
	const [error, setError] = useState({});
	const { id } = useParams();
	const [datas, setDatas] = useState({});
	//Redireccionar a otra página
	const navigate = useNavigate();

	useEffect(() => {
		CargarLista();
	}, []);

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

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/users/${id}`, {
				withCredentials: true,
			})
			.then((res) => {
				setDatas(res.data.user);
			})
			.catch((err) => console.log(err));
	}, [id]);

	//Evitar que la página se refresque al presionar el botón
	const submitHandler = (e) => {
		e.preventDefault();
		// setError('')
		axios
			.post(
				'http://localhost:8000/api/crearGenerico',
				{
					idea,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				console.log(res);
				// navigate('/');
				CargarLista();
			})
			.catch((err) => {
				console.log(err);
				setError(err);
			});
	};

	const CargarLike = (id, like) => {
		axios
			.put(
				`http://localhost:8000/api/genericoLike/${id}`,
				{
					likes: like + 1,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				CargarLista();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	//Evitar que la página se refresque al presionar el botón
	const deleteHandler = (id) => {
		// socket.emit('borrarSerie',id)
		// navigate('/todaserie')                                 , {withCredentials:true}
		// e.preventDefault()
		axios
			.delete(`http://localhost:8000/api/borrarGenerico/${id}`, {
				withCredentials: true,
			})
			.then((res) => {
				// navigate('/')
				CargarLista();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const logout = (e) => {
		e.preventDefault();
		axios
			.get('http://localhost:8000/api/logout', { withCredentials: true })
			.then((res) => {
				navigate('/');
			})
			.catch((error) => console.log(error));
	};

	return (
		<div>
			<div className='col-10 mx-auto'>
				<div className='listadoexamen-principal'>
					<div>
						<p>{`Hola ${datas?.nombre}!`}</p>
					</div>

					<div id='enlace'>
						<Link onClick={logout}>Logout</Link>
					</div>
				</div>
				<div>
					<form onSubmit={submitHandler} className='listadoexamen'>
						<fieldset>
							{/* <legend>Legend</legend> */}
							<div id='primerdiv' className='row mb-3'>
								<button className='btn btn-primary'>
									Idea!
								</button>

								<div className='col-sm-7'>
									<input
										type='text'
										className='form-control'
										placeholder='Post something witty here...'
										onChange={(e) =>
											setIdea(e.target.value)
										}
									/>
									{error?.response?.data?.errors?.idea
										?.message ? (
										<span className='text-danger'>
											{' '}
											{
												error?.response?.data?.errors
													?.idea?.message
											}
										</span>
									) : null}
								</div>
							</div>
						</fieldset>
					</form>
				</div>
				<table id='listadoTablaLista' className='table table-white'>
					<tbody>
						{listas?.map((lista) => {
							return (
								<tr>
									<td>
										<div>
											<Link
												to={`/users/${lista.creador.nombre}/${lista.creador.alias}/${lista.creador.email}/${lista.creador._id}/${id}`}>
												{lista.creador.nombre} dice:
											</Link>
										</div>
									</td>
									<td>
										<div className='cuadrito'>
											{' '}
											{lista.idea}{' '}
										</div>
									</td>
									<td>
										<div>
											<Link
												onClick={() =>
													CargarLike(
														lista._id,
														lista.likes
													)
												}>
												Like
											</Link>
											<Link
												to={`/bright/ideas/${lista._id}/${id}`}>
												{lista.likes.length} persona/s
											</Link>
										</div>
									</td>
									{lista?.creador._id === id ? (
										<td>
											<div>
												<button
													className='btn btn-primary'
													onClick={() =>
														deleteHandler(lista._id)
													}>
													Delete
												</button>
											</div>
										</td>
									) : null}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ListadoGenerico;
