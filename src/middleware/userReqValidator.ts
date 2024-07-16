import express, { NextFunction } from 'express'
import { body, query, validationResult } from 'express-validator'


// request validator middleware for get request on user route 
const getUserReqValidator = [
   query('role', 'role is invalid!').isString().escape(),
   query('active', 'active is invalid!').isBoolean().escape(),
   query('page', 'page is invalid!').exists().notEmpty().isNumeric().escape(),
   query('limit', 'limit is invalid!').exists().notEmpty().isNumeric().escape(),
   query('sort', 'sort is invalid!').exists().notEmpty().isBoolean().escape(),
   async (req: any, res: any, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ status: "Failed", data: "", error: errors.array()[0].msg, msg: "Request validation failed!" });
      }
      next()
   }
]

export default { getUserReqValidator }