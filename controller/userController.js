const users=require('../models/userModel')
const jwt=require('jsonwebtoken')

exports.userRegistration=async(req, res)=>{
    try{
        console.log(req.body)
        const {email , username , password }=req.body 
        if(!email|| ! username || !password){
            res.status(400).json("invalid data")
        }else{
            const newUser=new users({
                email,username,password , github:"" , linkedln:"" , profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

exports.userLogin=async(req , res)=>{
    try{
        const {email , password}=req.body
        const existing=await users.findOne({email, password})
    if(existing){
        const token=jwt.sign({userid:existing._id},process.env.SECRET_KEY)
        res.status(200).json({token, username:existing.username , github:existing.github , linkedln:existing.linkedln , profile:existing.profile})
    }
    else{
        res.status(404).json("Invalid Email/Password")
    }
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
    
}

exports.profileupdate=async(req , res )=>{
    try{
        const userid=req.payload
        if(req.file){
            var profile=req.file.filename
            var {username , github , linkedln}= req. body
        }else{
            var { username , github , linkedln , profile} = req . body 
        }
        const existingprofile=await users.findOne({_id:userid})
        existingprofile.username=username
        existingprofile.github=github
        existingprofile.linkedln=linkedln
        existingprofile.profile=profile
        await existingprofile.save()
        res.status(200).json("profile updated")
    
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }

}

