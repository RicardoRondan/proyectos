   //CONFIGURACION
//EXPRESS
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000


//Llamar conexión a Base de Datos
require('./config/mongoose.config')

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//CORS
app.use(cors({
    origin:'http://localhost:3000'
}))


//Apuntar Enrutamiento
//Importar las rutas de nuestro servidor Back-End
const RutasGenerico = require('./routes/generico.route')
RutasGenerico(app)

// Esto debe estar debajo de los otros bloques de código
const server = app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})