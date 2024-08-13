const express = require('express')
const routes = express.Router()
const { signUp, login, logOut, handlerRefreshToKen, getEditUser, updateUser, deleteUser, getListUsers } = require('../../controllers/access.Controller')
const { authentication } = require('../../auth/jwt_service')
const { asyncHandler } = require("../../helpers/asyncHandler")

// SignUp 

routes.post('/signUp', asyncHandler(signUp))
routes.post('/login', asyncHandler(login))
routes.get('/getListUsers', asyncHandler(getListUsers))
routes.get('/editUser/:id', asyncHandler(getEditUser))
// authentication 
routes.use(authentication)
//////////////////////////

routes.patch('/patchUser', asyncHandler(updateUser))
routes.delete('/deleteUser/:id', asyncHandler(deleteUser))

routes.post('/logout', asyncHandler(logOut))
routes.post('/handlerRefreshToKen', asyncHandler(handlerRefreshToKen))

module.exports = routes;







