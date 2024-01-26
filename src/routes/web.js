const express = require('express');
const app = express();
const router = express.Router()
const { getAllUser, createNewUser, geteditUser, putUser, deleteUser, Create } = require('../controllers/homeController')

router.get('/', getAllUser)
router.get('/home', Create)
router.post('/create-User', createNewUser)
router.get('/edit-User', geteditUser)
router.get('/put-User', putUser)
router.get('/delete-User', deleteUser)




module.exports = router;


