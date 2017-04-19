const mongoose = require('mongoose')
const Schema = mongoose.Schema

let minlength = [8, 'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];

let userSchema = new Schema({
  email: String,
  password: {type: String, minlength: minlength},
  isAdmin : {type: Boolean, default: false}
})

userSchema.path('email').validate((email)=> {
  let regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  return regex.test(email.text)
}, 'Invalid email format')

const User = mongoose.model('User', userSchema)
module.exports = User