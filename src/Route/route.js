const route = require('express').Router()
const {userCreate,userLogin} =require('../controllers/userController')
const {ticketGenarate,findTicketByCreationId} = require('../controllers/ticketController')
const {authentication} = require('../auth/auth');

//user Route
route.post('/user/signup',userCreate)      // new user create
route.post("/user/login",userLogin)        //login with existing user and get token

//ticket route
route.post("/ticket",authentication,ticketGenarate)      //create ticket
route.get("/ticket/:creation_id",findTicketByCreationId) //get ticket by ticket's creation id


module.exports =route