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
        console.log('register failed')
        res.status(400).send(err)
      } else {
        console.log('register done')
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
        console.log('login failed')
        res.status(400).send(err)
      } else {
        console.log('login done')
        res.send(users)
      }
    })
  },
  editUser: (req,res)=> {
    User.findByIdAndUpdate(req.params.id, {
      email: req.body.email
    }, {new: true}, (err, user)=> {
      if(err) {
        console.log('edit failed')
        res.status(400).send(err)
      } else {
        console.log('edit done')
        res.send(user)
      }
    })
  },
  deleteUser: (req,res)=> {
    User.findByIdAndRemove(req.params.id, (err, user)=> {
      if(err) {
        console.log('delete failed')
        res.status(400).send(err)
      } else {
        console.log('delete done')
        res.send(user)
      }
    })
  }
}