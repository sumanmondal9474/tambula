const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');

//all regexs
const nameRegex = /^[a-zA-Z ]{3,}$/
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[~! @#$%^&*()_\-+={[}\]|\:;<,>\.\?\/]).{8,16}$/

//constants
const secrectKey = "Dummy-secrect"
const tokenExparie = { expiresIn: '1d' }


const userCreate = async (req, res) =>{
    try {
        let {name,email,password} = req.body;
        if(!name && !email && !password) return res.status(400).send({status:false,message:"name, email, password are required"})

            //name validation
            if(typeof name ==='string' && name.trim().length == 0 )return  res.status(400).send({status:false,msg:"name is required"})
            if(! nameRegex.test(name) ) return res.status(400).send({status:false, msg:"Enter valid name format"})
            name = name.trim()

            //email validation
            if(typeof email ==='string' && email.trim().length == 0 )return  res.status(400).send({status:false,msg:"email is required"})
            if(! emailRegex.test(email) ) return res.status(400).send({status:false, msg:"Enter valid email format"})
            email = email.trim()
            email = email.toLowerCase()
            const emailUniqueCheck = await userModel.findOne({email})
            if(emailUniqueCheck) return res.status(400).send({status:false, msg:`${email} already exist`})
            
            //password validation
            if(typeof password ==='string' && password.trim().length == 0 )return  res.status(400).send({status:false,msg:"password is required"})
            if(! passwordRegex.test(password)) return res.status(400).send({status:false,msg:"Your password must be length (8-16), at least one uppercase and one lowercase letter, at least one digit and at least one special character ( ~! @#$%^&*()_-+={[}]|\:;<,>.?/)"})



        const userData = await userModel.create({name,email,password})
        res.status(201).send({status:true,data:{name:userData.name,email:userData.email,password:userData.password}})
        
    } catch (error) {
        res.status(500).send({status:false,msg:error.message})
        
    }
}

const userLogin = async (req,res)=>{
    try {
        let {email,password} = req.body;

        if(!email && !password) return res.status(400).send({status:false,msg:"email and password are required"})

        if(!email) return res.status(400).send({status:false,msg:"You must have to fill email"})
        if(typeof email ==='string' && email.trim().length == 0 )return  res.status(400).send({status:false,msg:"email is required"})
        if(! emailRegex.test(email) ) return res.status(400).send({status:false, msg:"Enter valid email format"})
        email = email.trim()
        email = email.toLowerCase()

        if(!password) return res.status(400).send({status:false,msg:"You must have to fill password"})

        const userData = await userModel.findOne({ email, password})
        if(!userData) return res.status(400).send({status:false,msg:"email or password is wrong"})

        const payload = {
            user_id: userData._id
        }
        const token = jwt.sign(payload,secrectKey,tokenExparie)

        return res.status(200).send({status:true,access_token:token})
        
    } catch (error) {
        res.status(500).send({status:false,msg:error.message})
    }
}

module.exports={
    userCreate,
    userLogin,
    secrectKey
}