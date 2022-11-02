const express = require('express')
const router = express.Router()

const {registerUser,loginUser,} = require('../controllers/userController')
const {protect} = require('../Middlewares/AuthMiddleware')


router.post('/' ,registerUser)
router.post('/login',loginUser)

module.exports =router