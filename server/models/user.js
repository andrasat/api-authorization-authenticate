const mongoose = require('mongoose')
const Schema = mongoose.Schema

let minlength = [8, 'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];

let userSchema = new Schema({
  email: String,
  password: {type: String, minlength: minlength},
  isAdmin : {type: Boolean, default: false}
})

userSchema.path('email').validate((email)=> {
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}, 'Invalid email format')

const User = mongoose.model('User', userSchema)
module.exports = User