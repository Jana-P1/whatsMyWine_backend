import passport from 'passport';
import { GoogleOneTapStrategy } from 'passport-google-one-tap';
import { User } from '../models/user.js';
import { Profile } from '../models/profile.js'


passport.use(
  new GoogleOneTapStrategy ({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    verifyCsrfToken: false,
  },
  function(profile, done) {
    User.findOne({ googleId: profile.id }, function (err, user) {
      if (err) return done(err)
      if (user) {
        return done(null, user)
      } else {
        // new profile created via Google OAuth
        const newProfile = new Profile({
          name: profile.displayName,
          avatar: profile.photos[0].value
        })
        // new user created
        const newUser = new User({
          email: profile.emails[0].value,
          googleId: profile.id,
          userProfile: newProfile._id
        })
        newProfile.save(function(err) {
          if (err) return done(err)
        })
        newUser.save(function(err) {
          if (err) {
            // If something went wrong when creating user profile, remove the profile from database
            Profile.findByIdAndDelete(newProfile._id)
            return done(err)
          }
          return done(null, newUser)
        })
      }
    })
  }
))

passport.serializeUser(function (err, done) {
  done (null, User.id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id)
  .populate('userProfile', 'name avatar')
  .exec(function(err, user) {
    done(err, user)
  })
})
