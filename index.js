require('dotenv').config()

const express=require('express')
const cors=require('cors')
const routes=require('./Routes/routes')
require('./connection/db')

const pfserver=express()

pfserver.use(cors())
pfserver.use(express.json())

// pfserver.use(jwt)

pfserver.use(routes)

pfserver.use('/uploads', express.static('uploads'))

const PORT= 3000 || process.env.PORT

pfserver.listen(PORT , ()=>{
    console.log(`server running at ${PORT}`);
})

pfserver.get('/' , (req, res)=>{
    res.send("<h1> welcome to express server</h1>")
})