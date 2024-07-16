import { NextFunction } from 'express'
import UserModel from '../models/UserModel';
import jwt from 'jsonwebtoken'

// check if user has a valid token and is valid user
const authenticationCheck = async (req: any, res: any, next: NextFunction) => {
   const header = req.headers['authorization'];

   if (header) {
      const bearer = header.split(' ');
      const token = bearer[1];
      try {
         // verifying jwt token
         jwt.verify(token, process.env.JWT_SECRET!, async (err: any, data: any) => {
            if (err) {
               console.log(err);
               return res.status(400).send({ status: "Failed", data: "", error: err, msg: "Authentication Failed!" });
            }

            // check if user exists in database
            const user = await UserModel.findOne({ _id: data.userId })

            //if user is not present in database
            if (!user) {
               return res.status(404).send({ status: "Failed", data: "", error: "User Not found!", msg: "Authentication Failed!" });
            }

            // if user is a valid user
            req.token = data;
            next();
         })


      } catch (error) {
         return res.status(400).send({ status: "Failed", data: "", error: error, msg: "Authentication Failed!" });
      }
   }
}

// check is user has admin rights
const adminCheck = async (req: any, res: any, next: NextFunction) => {
   const userId = req.token.userId;

   // check if user exists and is admin
   const user = await UserModel.findOne({ id: userId })
   if (!user || user.role !== 'admin') {
      return res.status(404).send({ status: "Failed", data: "", error: "Access Denied!", msg: "Authentication Failed!" });
   }
   next
}

export default { authenticationCheck, adminCheck }