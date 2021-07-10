const { model, Schema } = require('mongoose')
const crypto = require('crypto')
const uniqueValidator = require('mongoose-unique-validator')
const jwt = require('jsonwebtoken')
const secret = require('../../config').JWT_SECRET

const UserSchema = new Schema({
  email: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true, unique: true },
  paid: { type: Boolean, required: false },
  salt: { type: String, required: true },
  hash: { type: String, required: true }
}, { timestamps: true })

UserSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash === hash
}

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

UserSchema.methods.generateJWT = function () {
  const today = new Date()
  const exp = new Date(today)
  exp.setDate(today.getDate() + 60)

  return jwt.sign({
    id: this._id,
    email: this.email,
    exp: parseInt(exp.getTime() / 1000)
  }, secret)
}

UserSchema.methods.toAuthJSON = (user) => {
  console.log('here')
  return {
    email: user.email,
    token: user.generateJWT()
  }
}

UserSchema.methods.setPaid = paid => {
  this.paid = paid
}

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' })

module.exports = model('User', UserSchema)
