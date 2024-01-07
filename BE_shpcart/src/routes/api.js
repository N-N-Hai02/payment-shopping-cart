import express from "express"
import momoController from '../controllers/momoController'

const router = express.Router()

const initApiRoutes = (app) => {
    // rest full API
    // CRUD : Create - Read - Update - Delete => POST - GET - PUT - DELETE
    router.post('/payment/momo', momoController.paymentMomo)
    
    return app.use("/api/v2", router)
}

export default initApiRoutes