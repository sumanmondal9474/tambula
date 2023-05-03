const express = require('express');
const mongoose = require('mongoose');
const route = require('./Route/route')

const mongo_url ="mongodb+srv://sumanmondal9474:8m2EfKAK80H20olD@cluster0.5j9ryev.mongodb.net/tumbulaDB"
mongoose.connect(mongo_url).then(()=>console.log('mongoDB connected..')).catch((err)=>console.log(err.message))

const app = express()

app.use(express.json())
app.use("/",route)




const post = process.env.PORT || 3000
app.listen(post,()=>console.log("server running on port "+post))