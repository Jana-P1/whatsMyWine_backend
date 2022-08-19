import { Router } from "express";
import passport from "passport";

const router = Router()

// Google Login route
router.get('/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
))
// Google OAuth callback route
router.get(
  '/google/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/google'
  })
)
// LogOut Route
router.get('/logout', function(req, res) {
  req.logOut()
  res.redirect('/login')
})


export {
  router
}