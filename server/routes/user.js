const express = require('express')
const helper = require('../helpers/verify')
const User = require('../controllers/user')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const UserModel = require('../models/user')
const router = express.Router()

passport.use(new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, (username, password, done)=> {
  UserModel.findOne({email: username}, (err, user)=> {
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

// User Route
router.get('/user', User.listUser)
router.post('/register', User.register)
router.post('/login', passport.authenticate('local', {session: false}), User.login)
router.put('/user/:id', helper.ifAdmin, User.editUser)
router.delete('/user/:id', helper.ifAdmin, User.deleteUser)

module.exports = router