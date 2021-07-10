const { model, Schema } = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
const uniqueValidator = require('mongoose-unique-validator')
const jwt = require('jsonwebtoken')
const secret = require('../../config').JWT_SECRET

const UserSchema = new Schema({
  email: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
  paid: { type: Boolean, required: true },
  salt: { type: String, required: true },
  hash: { type: String, required: true }
}, { timestamps: true })

UserSchema.methods.setPassword = password => {
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return err
    // save the salt
    this.salt = salt

    // hash the password using our new salt
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return next(err)
      // save the hash
      this.hash = hash
    })
  })
}

UserSchema.methods.generateJWT = function () {
  const today = new Date()
  const exp = new Date(today)
  exp.setDate(today.getDate() + 60)

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, secret)
}

UserSchema.methods.validPassword = password => {
  bcrypt.compare(password, this.hash, (err, res) => {
    if (err) { throw err }
    return res
  })
}

UserSchema.methods.toAuthJSON = () => {
  return {
    email: this.email,
    token: this.generateJWT()
  }
}

UserSchema.methods = paid => {
  if (paid) {

  }
}

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' })

module.exports = model('User', UserSchema)
