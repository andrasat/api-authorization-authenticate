const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  verify: (req,res,next)=> {
      jwt.verify(req.headers.token, process.env.SECRET, (err, decoded)=> {
        if(decoded) {
          res.locals.user = decoded
          next()
        } else {
          res.send('Login failed')
        }
      })
  },
  ifAdmin: (req,res,next)=> {
    jwt.verify(req.headers.token, process.env.SECRET, (err, decoded)=> {
      if(decoded.isAdmin) {
        res.locals.user = decoded
        next()
      } else {
        res.send('Restricted Access')
      }
    })
  }
}