const express = require('express');
const router = express.Router();


const ObjectId= require('mongoose').Types.ObjectId;

const Tournament = require('../models/tournament.js');

//GET, PUT, POST, DELETE
//base path: http://localhost:3000/tournament


// Get api
router.get('/',(req, res)=>{
Tournament.find((err,doc)=>{
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
        Tournament.findById(req.params.id,(err, doc) =>{
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


// Delete single tournament api
router.delete('/:id',(req, res)=>{
    if(ObjectId.isValid(req.params.id)){
        Tournament.findByIdAndRemove(req.params.id,(err, doc) =>{
            if(err){
    
                console.log('Error in Deleting the data '+err)
            }else{
                res.send(doc);
            }
        })
    }else{
        return res.status(400).send('No record found with id '+req.param.id);
    }
    })

    // Put api
router.put('/:id',(req, res)=>{
    if(ObjectId.isValid(req.params.id)){

        let tour = {
            tour : req.body.tour,
            game : req.body.game,
            date : req.body.date,
            num :  req.body.num
    
        };
        Tournament.findByIdAndUpdate(req.params.id, {$set :tour}, {new:true}, (err, doc) =>{
            if(err){    
                console.log('Error in Updating the data '+err)
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

    let tour = new Tournament({
        tour : req.body.tour,
        game : req.body.game,
        date : req.body.date,
        num :  req.body.num

    });

    tour.save((err,doc)=>{
        if(err){

            console.log('Error in post data '+err)
        }else{

            res.send(doc);
        }
    })
})

module.exports =router;