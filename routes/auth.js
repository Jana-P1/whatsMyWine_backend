import { Router } from "express";
import passport from "passport";

const router = Router()

// Successful login
router.get("/login/success", (req, res) => {
  if(req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user
    })
  }
})
// Failed Login
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Login via Google failed"
  })
})
// Google Login route
router.post("/auth/one-tap/callback", passport.authenticate("google-one-tap", { failureRedirect: '/login' }),
  function(req, res, next) {
    res.redirect(process.env.CLIENT_URL)
  }
)
// Google OAuth callback route
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login/failed'
  })
)
// Google LogOut Route
router.get('/logout', function(req, res) {
  req.logOut()
  res.redirect('/login')
})


export {
  router
}