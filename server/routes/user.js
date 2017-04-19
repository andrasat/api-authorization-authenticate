const express = require('express')
const helper = require('../helpers/verify')
const User = require('../controllers/user')
const passport = require('passport')
const router = express.Router()

// User Route
router.get('/user', User.listUser)
router.post('/register', User.register)
router.post('/login', passport.authenticate('local'), User.login)
router.put('/user/:id', helper.ifAdmin, User.editUser)
router.delete('/user/:id', helper.ifAdmin, User.deleteUser)

module.exports = router