import UserModel from '../models/UserModel'


const getUser = async (req: any, res: any) => {
   const { role, active = true, page = 1, limit = 10, sort } = req.params

   try {
      // aggregate function to retrieve data from mongo
      UserModel.aggregate([{
         $match: {
            $and: [
               { $role: role }, { $active: active },
            ]
         },
      },
      { $skip: page * limit },
      { $limit: limit },
      { $sort: { created_at: 1, name: 1 } }
      ])
         .then(users => {
            // if users were successfully retrieved from mongo
            res.status(201).send({ status: "Success", data: users, error: "", msg: "Users Found!" });
         })
         .catch(err => {
            // if users were not successfully retrieved from mongo
            return res.status(400).send({ status: "Failed", data: "", error: err, msg: "Error finding users!" });

         })


   } catch (error) {
      console.log(error)
      return res.status(400).send({ status: "Failed", data: "", error: error, msg: "Internal Server Error!" });
   }
}

export default { getUser }