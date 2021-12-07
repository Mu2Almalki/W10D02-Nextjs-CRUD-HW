const mongoose = require('mongoose')

const PlanetSchema = new mongoose.Schema({
    name:{
    type : String,
    required :[true , 'Please add Name'],
    },
    moons:{type:Number} ,
    
    length:{type:Number}
})
module.exports =mongoose.models.Planet || mongoose.model('Planet' , PlanetSchema)