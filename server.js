import express from 'express';
import session from 'express-session';
import passport from 'passport';
import logger from 'morgan';
import cors from 'cors';
import 'dotenv/config.js';
import createError from 'http-errors';
import methodOverride from 'method-override';
import { router as profileRouter } from './routes/profiles.js'
import { router as authRouter } from "./routes/auth.js"
import { passUserToView } from "./middleware/middleware.js"
import cookieSession from 'cookie-session';



// Connect to MongoDB through mongoose
import('./config/database.js')

// Load Passport
import('./config/passport.js')

// Create Express App
const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())


/** Session Middleware */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())

// Custom Middleware
app.use(passUserToView)
// Mounted Routes

app.use('/auth', authRouter)
app.use('/profiles', profileRouter)

app.use(function (req, res, next) {
  res.status(404).json({ err: "Not Found" })
})

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message })
})

export { app }


