import express, { NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

// request validator middleware for get request on user route 
const postProductReqValidator = [
   body('name', 'Role is required!').exists().notEmpty().isString().escape(),
   body('description', 'Role is required!').exists().notEmpty().isString().escape(),
   body('catagory', 'Role is required!').exists().notEmpty().isString().escape(),
   body('price', 'Role is required!').exists().notEmpty().isNumeric().escape(),
   body('available', 'Role is required!').exists().notEmpty().isBoolean().escape(),
   async (req: any, res: any, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ status: "Failed", data: "", error: errors.array()[0].msg, msg: "Request validation failed!" });
      }
      next()
   }
]

export default { postProductReqValidator }