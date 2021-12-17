const mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

// const User = mongoose.model('User',{

//     username :{type: String},
//     password :{type: String},
//     email :{type: String},
//     displayName :{type: String}
// });


let User = mongoose.Schema
(
    {
        username: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'username is required'
        },
        
        password: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'password is required'
        },
        
       email: 
       {
            type: String,
            default: '',
            trim: true,
            required: 'email address is required'
       },
       displayName: 
       {
            type: String,
            default: '',
            trim: true,
            required: 'Display Name is required'
       }
    },
    {
        collection: "users"
    }
);
// configure options for User Model

let options = ({ missingPasswordError: 'Wrong / Missing Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);
// module.exports = User;