import express, { NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

// request validator middleware for get request on user route 
const postProductReqValidator = [
   body('name', 'name is invalid!').exists().notEmpty().isString().escape(),
   body('description', 'description is invalid!').exists().notEmpty().isString().escape(),
   body('catagory', 'catagory is invalid!').exists().notEmpty().isString().escape(),
   body('price', 'price is invalid!').exists().notEmpty().isNumeric().escape(),
   body('available', 'available is invalid!').exists().notEmpty().isBoolean().escape(),
   async (req: any, res: any, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ status: "Failed", data: "", error: errors.array()[0].msg, msg: "Request validation failed!" });
      }
      if (req.body.price > 1000 && !req.body.approvalCode) {
         return res.status(400).send({ status: "Failed", data: "", error: "approvalCode is required for products with price > 1000", msg: "Request validation failed!" });
      }
      next()
   }
]

export default { postProductReqValidator }