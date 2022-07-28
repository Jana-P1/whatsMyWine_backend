import express from 'express';
import session from 'express-session';
import passport from 'passport';
import logger from 'morgan';
import cors from 'cors';
import 'dotenv/config.js';
import createError from 'http-errors';
import methodOverride from 'method-override';



// Connect to MongoDB through mongoose
import('./config/database.js')

// Load Passport

// Create Express App
import('./config/database.js')
const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


/** Session Middleware */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'lax',
    }
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
  res.status(404).json({ err: "Not Found" })
})

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message })
})

export { app }



// Configure the app (app.set)

// Middleware