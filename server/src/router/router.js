const express = require('express')
const router = express.Router()
const bookController = require('../controller/book.Controller')
const userController = require('../controller/userController')
const ordersController = require('../controller/orderController')
const middleware = require('../middleware/middleware')
const commentController = require('../controller/commentController')
const discountController = require('../controller/discountController')
const upload = require('../middleware/middlewareUpload')
router.get('/data',userController.data)

router.get('/data-book',userController.dataBook)

router.post('/register',middleware.validation,userController.register)

router.post('/login',userController.login)
router.get('/postLogin',middleware.verify,userController.postLogin)

router.get('/getInfor/:id',userController.getInfor)
router.put('/changePassword',userController.changePassword)
router.put('/gender',userController.updateGender)
router.get('/getDetail_Book/:id',userController.getDetail_Book)

router.get('/getCart/:id',userController.getCart)
router.put('/addCart',userController.addCart)
router.put('/removeCart',userController.removeCart)

router.put('/getPayment',userController.getPayment)
router.put('/payment',userController.payment)

router.get('/getOrder/:id',userController.getOrder)

router.delete('/removeBook',bookController.removeBook)
router.get('/category/:category',bookController.getCategory)

router.get('/getBook',bookController.getBook)

router.get('/search/:key',bookController.getSearchBook)

router.post('/auth/google',userController.authoGoogle)

router.get('/checkAdmin',middleware.verify,userController.postLogin)

router.put('/editBook',bookController.editBook)
router.delete('/removeBook/:_id',bookController.adminRemoveBook)
router.get('/order',ordersController.getOrders)
router.get('/takeOrder/:_id',ordersController.getOrder)
router.delete('/deleteOrderBox/:_id',ordersController.deleteBox)
router.delete('/adminDeleteOrderBox',ordersController.adminDeleteOrderBox)
router.put('/updateOrder',ordersController.updateOrder)
router.get('/getAdminUser',userController.getAdminUser)
router.delete('/adminDeleteUser',userController.adminDeleteUser)

router.get('/getComment/:id_Book',commentController.getComment)
router.put('/sendComment',middleware.verify,commentController.sendComment)

router.delete('/userDeleteOrder/:id_Order',ordersController.userDeleteOrder)

router.put('/addDiscount',discountController.addDiscount)
router.get('/getDiscount',discountController.getDiscount)
router.delete('/deleteDiscount',discountController.deleteDiscount)

router.put('/dashboard/editDiscount',discountController.editDiscount)

router.post('/upload-avatar/:id_User',upload.single("avatar"),userController.uploadFile)
router.get('/getTotalData',ordersController.getTotalData)
module.exports = router