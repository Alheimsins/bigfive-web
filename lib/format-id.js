const { URL } = require('../config')

module.exports = id => /^((http|https):\/\/)/.test(id) ? id.replace(URL + '/result/', '').replace(' ', '') : id ? id.replace(' ', '') : id
