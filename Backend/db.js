const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
const connectToMongo = ()=>{
    mongoose.connect(url,()=>{
        console.log('connected Successfully !')
    })
}
module.exports = connectToMongo


// We will open two powershell windows. In the first, we will write mongod and in the second we will write mongo and then run both the files 