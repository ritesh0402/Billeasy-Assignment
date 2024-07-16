import ProductModel from "../models/ProductModel";

const postProduct = async (req: any, res: any) => {
   const { name, description, catagory, price, available = true, approvalCode = "" } = req.body
   try {
      //creating new product and saving it to mongodb
      const newProduct = await ProductModel.create({
         name: name,
         description: description,
         catagory: catagory,
         price: price,
         available: available,
         approval_code: approvalCode
      })

      // if product was not created
      if (!newProduct) {
         return res.status(400).send({ status: "Failed", data: "", error: "Error inserting in database!", msg: "Internal Server Error!" });
      }

      // if product saved to mongodb
      newProduct.save()
      return res.status(201).send({ status: "Success", data: newProduct, error: "", msg: "Product successfully inserted!" });

   } catch (error) {
      console.log(error)
      return res.status(400).send({ status: "Failed", data: "", error: error, msg: "Internal Server Error!" });
   }
}

export default { postProduct }