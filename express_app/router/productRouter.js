const router = require('express').Router()

const {productController} = require('../controller')

router.get('/getAllProducts', productController.getAllProducts)
router.post('/add-product', productController.addProduct)
router.delete('/delete-product/:id', productController.deleteProduct)
router.put('/put-products/:id', productController.putProduct)
router.patch('/patch-products/:id', productController.patchProduct)

module.exports = router