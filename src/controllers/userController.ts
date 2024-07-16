import UserModel from '../models/UserModel'


const getUser = async (req: any, res: any) => {
   const { role, active = true, page = 1, limit = 10, sort = 1 } = req.params

   try {
      const matchUser: any = {};
      if (role) {
         matchUser.role = role; // Filter by role if role query parameter is provided
      }
      if (active !== undefined) {
         matchUser.active = active === 'true'; // Filter by active status if active query parameter is provided
      }
      // aggregate function to retrieve data from mongo
      UserModel.aggregate([{
         $match: matchUser
      },
      { $sort: { createdAt: sort, name: sort } }, // sorting before pagination because this will make sure the results are globally sorted and not locally
      { $skip: page * limit },
      { $limit: limit }
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