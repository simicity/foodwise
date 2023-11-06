import express from 'express'
import cors from 'cors'

import passport from 'passport'
import session from 'express-session'
import { GoogleOauth20 } from './config/auth.js'

import authRouter from './routes/auth.js'
import apiRouter from './routes/index.js'

const app = express()

app.use(session({
  secret: 'foodwise',
  resave: false,
  saveUninitialized: true
}))

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE,PATCH',
  credentials: true
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(GoogleOauth20)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

app.get('/', (req, res) => {
  res.redirect('http://localhost:5173')
})

app.use('/auth', authRouter)
app.use('/api', apiRouter)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
})