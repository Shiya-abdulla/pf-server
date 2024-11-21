const express= require('express')
const userController=require('../controller/userController')
const projectController=require('../controller/projectController')

const jwtMiddle=require('../middleware/jwtMiddleware')
const multerMiddle=require('../middleware/multerMiddleware')


const routes=express.Router()

routes.post('/reg' , userController.userRegistration)
routes.post('/log' , userController.userLogin)
routes.put('/profileupdate' ,jwtMiddle, multerMiddle.single('profile'), userController.profileupdate)

routes.post('/addproject',jwtMiddle,multerMiddle.single('image'), projectController.addProject)
routes.get('/projectlist' , jwtMiddle , projectController.getProjectlist)
routes.delete('/delproject/:id',jwtMiddle,projectController.deleteProject)
routes.put('/editproject/:id',jwtMiddle,multerMiddle.single('image'), projectController.editProject)
routes.get('/landingproject', projectController.landinproject)


module.exports=routes