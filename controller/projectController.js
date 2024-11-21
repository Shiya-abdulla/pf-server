const projects = require('../models/projectModel')

exports.addProject =async (req, res) => {
    try{
        const { title, description, languages, github, demo} = req.body
        const image=req.file.filename
        const userid=req.payload
        if(!title || !description || !languages || !github || !demo || !image){
            res.status(400).json("invalid data")
        }else{
            const newProject= new projects({
                title,description,languages,github,demo,image, userid
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)

    }
   
}

exports.getProjectlist=async(req , res)=>{
    try{
        const userid=req.payload
        const projectlist=await projects.find({userid})
        res.status(200).json(projectlist)
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)

    }
   
}

exports.deleteProject=async(req , res)=>{
    try{
        const {id}=req.params
    const result=await projects.findOneAndDelete({_id:id})
    res.status(200).json(result)
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)

    }
    
}

exports.editProject=async(req , res)=>{
    try{
        const {id}=req.params
        if(req.file){
            var image=req.file.filename
            var { title, description, languages, github, demo} = req.body

        }else{
            var { title, description, languages, github, demo , image} = req.body

        }
        const userid=req.payload
        if(!title || !description || !languages || !github || !demo || !image){
            res.status(400).json("invalid data")
        }else{
            const existing=await projects.findOne({_id:id})
            existing.title=title
            existing.description=description
            existing.languages=languages
            existing.github=github
            existing.demo=demo
            existing.image=image
            await existing.save()
            res.status(200).json(existing)
    
        }
    
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)

    }

}

exports.landinproject=async(req , res)=>{
    try{
        const projectlist=await projects.find()
        res.status(200) . json(projectlist)
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)

    }
}