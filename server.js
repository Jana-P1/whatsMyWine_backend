import express from 'express'
import passport from 'passport'
import logger from 'morgan'
import cors from 'cors'
import 'dotenv/config.js'

// Create Express App
import('./config/database.js')
const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())

app.use(function (req, res, next) {
  res.status(404).json({ err: "Not Found" })
})

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message })
})

export { app }



// Configure the app (app.set)

// Middleware