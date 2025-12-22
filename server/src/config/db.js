const mongoose = require('mongoose')

async function connect(){
     try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connect succesfully')
     }catch(err){
        console.log(err)
     }
}

module.exports = connect