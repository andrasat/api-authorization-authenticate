const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {

  register: (req,res)=> {
    let saltRounds = 10,
        pwd
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      pwd = hash
    })
    new User({
      email: req.body.email,
      password: pwd
    }).save((err)=> {
      if(err) {
        res.send(err)
      } else {
        res.send('Register Success')
      }
    })
  },
  login: (req,res)=> {
    let token = jwt.sign({email: req.user.email, isAdmin: req.user.isAdmin}, process.env.SECRET)
    res.send(token)
  },
  listUser: (req,res)=> {
    User.find({}, (err, users)=> {
      if(err) {
        res.send(err)
      } else {
        res.send(users)
      }
    })
  },
  editUser: (req,res)=> {
    User.findByIdAndUpdate(req.params.id, {
      email: req.body.email
    }, {new: true}, (err, user)=> {
      if(err) {
        res.send(err)
      } else {
        res.send(user)
      }
    })
  },
  deleteUser: (req,res)=> {
    User.findByIdAndRemove(req.params.id, (err, user)=> {
      if(err) {
        res.send(err)
      } else {
        res.send(user)
      }
    })
  }
}