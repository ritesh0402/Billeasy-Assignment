import express, { NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator'


// request validator middleware for get request on user route 
const getUserReqValidator = [
   param('role', 'role is invalid!').exists().notEmpty().isString().escape(),
   param('active', 'active is invalid!').exists().notEmpty().isBoolean().escape(),
   param('page', 'page is invalid!').exists().notEmpty().isNumeric().escape(),
   param('limit', 'limit is invalid!').exists().notEmpty().isNumeric().escape(),
   param('sort', 'sort is invalid!').exists().notEmpty().isBoolean().escape(),
   async (req: any, res: any, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ status: "Failed", data: "", error: errors.array()[0].msg, msg: "Request validation failed!" });
      }
      next()
   }
]

export default { getUserReqValidator }