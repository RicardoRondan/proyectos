const mongoose = require('mongoose')

//Schema (Base de Datos)
const schema_generico = mongoose.Schema({
    nombre:{
        type:String,
        required:[true, "Complete the name field"],
        minLength:[3,"Name: 3 characters minimum"],
        unique:[true, "The name already exists"]
    },
    fecha:{
        type: Date,
        required:[true, "Complete the date field"]
    },
    estado:{
        type:String
    }

},{timestamps:true})

//Modelo (Colección)
const Generico = mongoose.model('Generico', schema_generico)
//Exportarlo para que pueda ser utilizado por otro archivo o módulo
module.exports = Generico