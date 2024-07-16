import express from 'express'
import connectToMongo from './utils/db'
import 'dotenv/config'
import helmet from 'helmet';
import cors from 'cors'

import userRouter from './routers/userRouter'
import productRouter from './routers/productRouter'

const app = express();

// middlewares
app.use(helmet())
app.use(cors({ credentials: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Routes
app.use('/users', userRouter)
app.use('/products', productRouter)


// connect to mongodb
connectToMongo();

const port = process.env.PORT || 3000
app.listen(port, () => {
   console.log(`Server running on: http://localhost:${port}`)
})