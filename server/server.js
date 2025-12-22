require('dotenv').config()   // ⬅️ PHẢI ĐẶT TRÊN CÙNG

const express = require('express')
const cors = require('cors')
const path = require('path')

const connect = require('./src/config/db')
const Router = require('./src/router/router')

const app = express()

// Middleware
app.use(cors({
  origin: "*",
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")))

// Routes
app.get('/', (req, res) => {
  res.send('Hello')
})

app.use('/', Router)

// Connect DB
connect()

// Server
const PORT = process.env.PORT || 5000
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
