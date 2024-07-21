const express = require('express')
const routes = express.Router()

const { homePage, createNewUser, getEditUser, updateUser, deleteUser, registerUser, login, logOut, loginDisplay } = require('../../controllers/home.Controller')
const { regisUser, verifyOtp, refreshToken } = require('../../controllers/User.Controller')
const { verifyAccessToken, authorization, } = require('../../auth/jwt_service')
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

routes.use(authorization)
routes.post('/logout', asyncHandler(logOut))
// router.post('/api/login', userController.handleLogin);
// router.get('/api/get-all-users', userController.handleGetAllUsers)
// router.post('/api/create-new-user', userController.handleCreateNewUser)
// router.put('/api/edit-user', userController.handleEditUser)
// router.delete('/api/delete-user', userController.handleDeleteUser)

// router.get('/api/get-all-products', productController.handleGetAllProducts)
// router.post('/api/create-new-product', productController.handleCreateNewProduct)
// router.put('/api/edit-product', productController.handleEditProduct)
// router.delete('/api/delete-product', productController.handleDeleteProduct)

module.exports = routes; 