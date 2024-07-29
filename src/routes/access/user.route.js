const express = require('express')
const routes = express.Router()

const { homePage, createNewUser, getEditUser, updateUser, deleteUser, registerUser, login, logOut, loginDisplay, handlerRefreshToKen } = require('../../controllers/home.Controller')
const { regisUser, verifyOtp, refreshToken } = require('../../controllers/User.Controller')
const { verifyAccessToken, authentication, } = require('../../auth/jwt_service')
const { asyncHandler } = require("../../helpers/asyncHandler")

routes.get('/home', verifyAccessToken, homePage)
routes.get('/register', registerUser)
routes.post('/createNewUser', asyncHandler(createNewUser))
routes.get('/edit-user/:id', getEditUser)
routes.post('/patch-user', updateUser)
routes.get('/delete-user/:id', deleteUser)
routes.get('/delete-user/:id', deleteUser)

routes.post('/users/regisUser', regisUser)
routes.post('/users/verifyOtp', verifyOtp)

routes.post('/access-tokken', refreshToken)
routes.post('/refresh-tokken', refreshToken)

routes.get('/loginDisplay', loginDisplay)
routes.post('/login', asyncHandler(login))

routes.use(authentication)
routes.post('/logout', asyncHandler(logOut))
routes.post('/handlerRefreshToKen', asyncHandler(handlerRefreshToKen))

module.exports = routes; 