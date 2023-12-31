import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/login/success', (req, res) => {
  if (req.user) {
      res.status(200).json({ success: true, user: req.user })
  }
})

router.get('/login/failed', (req, res) => {
  res.status(401).json({ success: true, message: "failure" })
})

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
      if (err) {
          return next(err)
      }

      req.session.destroy((err) => {
          res.clearCookie('connect.sid')

          res.json({ status: "logout", user: {} })
      })
  })
})

router.get('/google',
  passport.authenticate('google', {
      scope: [ 'profile' ]
  })
)

router.get('/google/callback',
  passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect:'/login',
  })
)

export default router