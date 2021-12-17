const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Jayesh:DHgLXqfuocZU6CaW@cluster0.k09yb.mongodb.net/tournament?retryWrites=true&w=majority', (err)=>{
    if(!err){
        console.log('Database Connection Successful..!')
    }else{
        console.log('Error in connection '+err)
    }
})

module.exports = mongoose;