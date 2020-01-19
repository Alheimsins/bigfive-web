import { Router, Link } from '../routes'
import { Select, Button, Field } from '../components/alheimsins'
import { FaExternalLinkAlt } from 'react-icons/fa'
import ISO6391 from 'iso-639-1'
import { getInfo } from '@alheimsins/b5-johnson-120-ipip-neo-pi-r'

const { languages } = getInfo()
const languageList = languages.map(code => ({ code, name: ISO6391.getName(code) }))

const startTest = e => {
  e.preventDefault()
  const lang = e.target.languages.value
  Router.pushRoute(`/test/${lang}`)
}

const Home = ({ countryCode }) => {
  const defaultLanguage = languages.includes(countryCode) ? countryCode : 'en'
  const translation = require('../locales/en/translations.json')
  return (
    <div>
      <div style={{ paddingBottom: '20px', borderBottom: '1px solid rgb(234, 234, 234)' }}>
        <h1>{translation.home.title}</h1>
      </div>
      <div style={{ textAlign: 'left', margin: 'auto', fontSize: '14px', width: '100%' }}>
        <p>{translation.home.paragraphs.first}</p>
        <p>
          {translation.home.paragraphs.test_evaluation} <a href='http://ipip.ori.org' rel='noopener noreferrer' target='_blank'>ipip.ori.org</a>
          <FaExternalLinkAlt size='8' style={{ verticalAlign: 'top' }} />, {translation.home.paragraphs.inventory_is_from} <i>{translation.home.paragraphs.name_inventor}</i>.
        </p>
        <p> {translation.home.paragraphs.the_following} <b>{translation.home.paragraphs['10_minutes']}</b> {translation.home.paragraphs.to_complete}</p>
        <p>{translation.home.paragraphs.after_submitted} <i>{translation.home.paragraphs.openess}</i></p>
        <p>{translation.home.paragraphs.see_an} <Link route='/result/58a70606a835c400c8b38e84'><a> {translation.common.example}</a></Link> {translation.home.paragraphs.of_the_report}.</p>
        <h2>{translation.common.tips}</h2>
        <p>- {translation.home.paragraphs.tip1}</p>
        <p>- {translation.home.paragraphs.tip2}</p>
        <p>- {translation.home.paragraphs.tip3}</p>
        <h2>{translation.common.language}</h2>
        <form onSubmit={startTest}>
          <p>{translation.home.paragraphs.select_language}</p>
          <Field name={translation.common.language}>
            <Select name='languages' defaultValue={defaultLanguage} options={languageList} />
          </Field>
          <div style={{ textAlign: 'center', paddingTop: '20px' }}>
            <Button value={translation.home.paragraphs.start_test} type='submit' background='rgb(255, 0, 128)' border='1px solid rgb(255, 0, 128)' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home
