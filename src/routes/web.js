const express = require('express');
const router = express.Router()
const { getAllUser, homePage, createNewUser, geteditUser, putUser, deleteUser, Create } = require('../controllers/homeController')
router.get('/', homePage)
router.get('/getAllUser', getAllUser)
router.get('/home', Create)
router.post('/create-User', createNewUser)
router.get('/edit-User', geteditUser)
router.get('/put-User', putUser)
router.get('/delete-User', deleteUser)




module.exports = router;


