const multer=require('multer')

const storage=multer.diskStorage({
    destination:(req , file , callabck)=>{
        callabck(null, './uploads')
    }, 
    filename:(req , file , callback)=>{
        const filename=`image- ${Date.now()}-${file.originalname}`
        callback(null , filename)
    }
})

const fileFilter=(req , file ,callback )=>{
    if(file.mimetype=='image/jpg' || file.mimetype=='image/jpeg'|| file.mimetype=='image/png'){
        callback(null , true)
    }
    else{
        callback(null , false )
        return callback(new Error("please upload file with following extension ( jpg , png , jpeg"))
    }
}

const middleConfig=multer({
    storage , fileFilter
})

module.exports=middleConfig
