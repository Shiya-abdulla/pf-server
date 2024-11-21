const jwt=require('jsonwebtoken')


const jwtmiddleware=(req , res , next)=>{
    try{
        console.log(req.headers)
        var token = req.headers.authorization.split(' ')[1];
        console.log(token,"tokn")
        if(token){
            const val=jwt.verify(token,process.env.SECRET_KEY)
            console.log(val);
            req.payload=val.userid
            next()
        }
        else{
            res.status(402).json("invalid token")
        }
    
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
    // next()
}

module.exports=jwtmiddleware