import express from "express"
import paymentController from '../controllers/paymentController'

const router = express.Router()

const initApiRoutes = (app) => {
    // rest full API
    // CRUD : Create - Read - Update - Delete => POST - GET - PUT - DELETE
    router.post('/payment/momo', paymentController.paymentMomo)
    router.get('/payment/getVnpay', paymentController.paymentGetVnpay)
    router.post('/payment/postVnpay', paymentController.paymentPostVnpay)
    
    return app.use("/api/v2", router)
}

export default initApiRoutes