import express from "express"
import dotenv from "dotenv"
import { loginRoute, logoutRoute, registerRoute } from "./routes/userAuth.route.js"
import connectDB from "./config/dbConn.js"

const app = express()
dotenv.config()
const PORT = process.env.PORT

app.use(express.json())

connectDB()

app.use('/api/auth', registerRoute)
app.use('/api/auth', loginRoute)
app.use('api/auth', logoutRoute)

//messages
app.use('api/message', logoutRoute)

app.listen(PORT)

