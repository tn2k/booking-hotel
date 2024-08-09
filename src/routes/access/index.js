const express = require('express')
const routes = express.Router()
const { signUp, login, logOut, handlerRefreshToKen, getEditUser, updateUser, deleteUser, getListUsers } = require('../../controllers/access.Controller')
const { authentication } = require('../../auth/jwt_service')
const { asyncHandler } = require("../../helpers/asyncHandler")

// SignUp 

routes.post('/signUp', asyncHandler(signUp))
routes.post('/login', asyncHandler(login))


routes.get('/getListUsers', getListUsers)
routes.get('/editUser/:id', getEditUser)
routes.patch('/patchUser', updateUser)
routes.get('/deleteUser/:id', deleteUser)
// authentication 
routes.use(authentication)
//////////////////////////


routes.post('/logout', asyncHandler(logOut))
routes.post('/handlerRefreshToKen', asyncHandler(handlerRefreshToKen))

module.exports = routes;








