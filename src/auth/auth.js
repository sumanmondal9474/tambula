const jwt= require('jsonwebtoken');
const {secrectKey} = require('../controllers/userController');
const userModel = require('../models/userModel');

const authentication =async (req,res,next)=>{

    try {
         let token = req.headers.authorization
         if(!token)return res.status(400).send({status:false,meg:"token missing"})

         token = token.split(" ")[1]

         const decodeToken = jwt.verify(token,secrectKey,(err,data)=>{
            if(err)return {error:err.message}
            return data
         })

         if(decodeToken.error)return res.status(401).send({status:false,msg:decodeToken.error})

         const userCheck = await userModel.findById(decodeToken.user_id)
         if(!userCheck) return res.status(404).send({status:false,msg:"user not found"})

         next()

    } catch (error) {
        res.status(500).send({status:false,msg:error.message})   
    }
}

module.exports= {
    authentication
}