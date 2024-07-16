import express from 'express'
import productRequestValidator from '../middleware/productReqValidator'
import productController from '../controllers/productController'
import authCheck from '../middleware/authCheck'

const router = express.Router()

// middleware
router.use(authCheck.authenticationCheck)

// routes
router.post('/', productRequestValidator.postProductReqValidator, productController.postProduct)


export default router