module.exports = (id, url) => /^((http|https):\/\/)/.test(id) ? id.replace(url + '/result/', '').replace(' ', '').toLowerCase() : id ? id.replace(' ', '') : id
