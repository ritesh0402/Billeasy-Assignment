import express, { NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator'


// request validator middleware for get request on user route 
const getUserReqValidator = [
   param('role', 'Role is required!').exists().notEmpty().isString().escape(),
   param('active', 'Role is required!').exists().notEmpty().isBoolean().escape(),
   param('page', 'Role is required!').exists().notEmpty().isNumeric().escape(),
   param('limit', 'Role is required!').exists().notEmpty().isNumeric().escape(),
   param('sort', 'Role is required!').exists().notEmpty().isString().escape(),
   async (req: any, res: any, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ status: "Failed", data: "", error: errors.array()[0].msg, msg: "Request validation failed!" });
      }
      next()
   }
]

export default { getUserReqValidator }