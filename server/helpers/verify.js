const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {

  ifAdmin: (req,res,next)=> {
    jwt.verify(req.headers.token, process.env.SECRET, (err, decoded)=> {
      if(decoded.isAdmin) {
        next()
      } else {
        res.send('Restricted Access')
      }
    })
  }
}