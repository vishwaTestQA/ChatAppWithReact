import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/userAuth.route.js"
import messageRouter from "./routes/message.route.js"
import connectDB from "./config/dbConn.js"
import cors from 'cors'
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()
const PORT = process.env.PORT

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

// app.use(express.json())

//to upload images it gives 413: payload limit exceed error
app.use(express.json({ limit: "10mb" }));  // Increase JSON payload limit
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser())
connectDB()

app.use('/api/auth', authRouter)
// app.use('/api/auth', authRouter)
// app.use('api/auth', authRouter)
// app.use('api/auth')

//messages
app.use('/api/message', messageRouter)   //finding we need to give /**/** if we miss '/' then error 

app.listen(PORT)

//socketIo
