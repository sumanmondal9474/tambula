const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({

    creation_id :String,
    ticket:[[{type:Number}]]    

},{timestamps:true})

module.exports= mongoose.model('ticket',ticketSchema);