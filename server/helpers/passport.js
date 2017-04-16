const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user')

passport.use(new localStrategy({
  usernameField: email,
  passwordField: password,
  session: false
}, (username, password, done)=> {
  User.findOne({email: username}, (err, user)=> {
    if(err) {
      done(err)
    } else if (!user) {
      done(null, false)
    } else {
      bcrypt.compare(password, user.password, (err, res)=> {
        if(res) {
          done(null, user)
        } else {
          done(null, false)
        }
      })
    }
  })
}
))