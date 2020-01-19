module.exports = (request, response) => {
  const paths = request.url.split('/')
  const languages = require('./languages.json')
  const language = paths[paths.length - 1]
  const selectedLanguage = languages.includes(language) ? language : 'en'
  const translationPath = `./${selectedLanguage}/translations.json`
  const data = require(translationPath)
  response.json(data)
}
