const ticketModel = require('../models/ticketModel')
const tambola = require('tambola');
const shortId = require('shortid');


const ticketGenarate = async (req, res)=>{
    try {
        let { numberOfTicket } = req.body

        if(numberOfTicket){
            if(typeof numberOfTicket === 'object' || !Number(numberOfTicket) ) return res.status(400).send({status:false, msg:"numberOfTicket must be in number"})
            numberOfTicket= Number(numberOfTicket)
        }

        numberOfTicket = numberOfTicket || 1

        const tickets = []

        const creation_id = shortId.generate()
        
        for(let i =1;i<=numberOfTicket;i++){
            const ticket = tambola.generateTicket()
            const ticketDoc = { creation_id, ticket }
            tickets.push(ticketDoc)
        }

        await ticketModel.insertMany(tickets)

        return res.status(201).send({status:true,creation_id})

    } catch (error) {
        res.status(500).send({status:false,msg:error.message})
    }
}


const findTicketByCreationId = async (req,res)=>{
    try {
        const {creation_id} = req.params
        //ticket creation id validation
        if(shortId.isValid(creation_id)) return res.status(400).send({status:false, msg:`invalid ticket creation id`})

        let tickets = await ticketModel.find({creation_id}).select({_id:0,ticket:1})
        if(tickets.length === 0 ) return res.status(400).send({status:false,msg:"no ticket found"})

        tickets = tickets.map((e)=>e.ticket)
        return res.status(200).send({status:true,creation_id,tickets})

    } catch (error) {
        res.status(500).send({status:false,msg:error.message})
    }
}
module.exports= {
    ticketGenarate,
    findTicketByCreationId
}