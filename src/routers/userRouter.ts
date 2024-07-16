import express from 'express'
import userReqValidator from '../middleware/userReqValidator'
import userController from '../controllers/userController'
import authCheck from '../middleware/authCheck'
const router = express.Router()

// middleware
router.use(authCheck.authenticationCheck)

// routes
router.get('/', userReqValidator.getUserReqValidator, authCheck.adminCheck, userController.getUser)



export default router