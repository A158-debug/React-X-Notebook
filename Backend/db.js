const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
const connectToMongo = ()=>{
    mongoose.connect(url,()=>{
        console.log('connected Successfully !')
    })
}
module.exports = connectToMongo