const mongoose = require('mongoose');

const Tournament = mongoose.model('Tournament',{

    tour :{type: String},
    game :{type: String},
    date :{type: String},
    num :{type: String}
});

module.exports = Tournament;