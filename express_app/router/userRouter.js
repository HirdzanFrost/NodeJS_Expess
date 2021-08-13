const router = require('express').Router()

const { productController, userController} = require('../controller')

router.get('/getAllUsers', userController.getAllUsers)
router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/keeplogin/:id', userController.keepLogin)


module.exports = router