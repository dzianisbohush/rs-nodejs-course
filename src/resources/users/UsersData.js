const User = require('./user.model')


const USERS = Array(5).fill(null).map((_, idx) => new User({
  name: `user_name_${idx}`,
  login: `user_login_${idx}`,
  password: `user_password_${idx}`
}))

module.exports = {USERS}
