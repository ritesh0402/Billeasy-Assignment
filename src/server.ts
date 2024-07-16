import express from 'express'
import connectToMongo from './utils/db'
import 'dotenv/config'
import helmet from 'helmet';
import cors from 'cors'
const app = express();

app.use(helmet())
app.use(cors({ credentials: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use('/users')
// app.use('/products')







connectToMongo();
const port = process.env.PORT || 3000
app.listen(port, () => {
   console.log(`Server running on: http://localhost:${port}`)
})


