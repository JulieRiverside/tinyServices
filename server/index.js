// server.js
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require("./db")

dotenv.config()

const app = express()
app.use(cors()) // allow requests from React
app.use(express.json()) // parse incoming json

// connect to db first
connectDB()

// routes
const profilesRouter = require("./routes/profiles")
app.use("/api/profiles", profilesRouter)

app.get("/ping", (req, res) => res.send("Server is up and running"))

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on port ${port}`))
