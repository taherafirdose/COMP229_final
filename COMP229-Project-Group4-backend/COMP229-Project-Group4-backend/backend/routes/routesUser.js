const express = require('express');
const router = express.Router();


const ObjectId= require('mongoose').Types.ObjectId;

const User = require('../models/userPassport.js');

//GET, PUT, POST, DELETE
//base path: http://localhost:3000/tournament


// Get api
router.get('/',(req, res)=>{
    User.User.find((err,doc)=>{
    if(err){

        console.log('Error in Get data '+err)
    }else{
        res.send(doc);
    }
})
})

// Get single tournament api
router.get('/:id',(req, res)=>{

    if(ObjectId.isValid(req.params.id)){
        User.findById(req.params.id,(err, doc) =>{
            if(err){
    
                console.log('Error in Get data '+err)
            }else{
                res.send(doc);
            }
        })

    }else{
        return res.status(400).send('No record found with id '+req.param.id);
    }
})




// Post api
router.post('/',(req, res)=>{

    const userJSON = User.User;

    let user = new userJSON({
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        displayName :  req.body.displayName

    });

    user.save((err,doc)=>{
        if(err){

            console.log('Error in post data '+err)
        }else{

            res.send(doc);
        }
    })
})

module.exports =router;