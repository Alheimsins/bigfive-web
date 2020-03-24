import { Router, Link } from '../routes'
import { Select, Button, Field } from '../components/alheimsins'
import { FaExternalLinkAlt } from 'react-icons/fa'
import ISO6391 from 'iso-639-1'
import { getInfo } from '@alheimsins/b5-johnson-120-ipip-neo-pi-r'
import withI18next from '../hoc/withI18next'

const { languages } = getInfo()
const langCodes = languages.map(lang => lang.id)
const languageList = langCodes.map(code => ({ code, name: ISO6391.getName(code) }))

const startTest = e => {
  e.preventDefault()
  const lang = e.target.languages.value
  Router.pushRoute(`/test/${lang}`)
}

const Home = ({ countryCode, t }) => {
  const defaultLanguage = langCodes.includes(countryCode) ? countryCode : 'en'
  return (
    <div>
      <div style={{ paddingBottom: '20px', borderBottom: '1px solid rgb(234, 234, 234)' }}>
        <h1>{t('home:title')}</h1>
      </div>
      <div style={{ textAlign: 'left', margin: 'auto', fontSize: '14px', width: '100%' }}>
        <p>{t('home:paragraphs:first')}</p>
        <p>
          {t('home:paragraphs:test_evaluation')} <a href='http://ipip.ori.org' rel='noopener noreferrer' target='_blank'>ipip.ori.org</a>
          <FaExternalLinkAlt size='8' style={{ verticalAlign: 'top' }} />, {t('home:paragraphs:inventory_is_from')} <i>{t('home:paragraphs:name_inventor')}</i>.
        </p>
        <p> {t('home:paragraphs:the_following')} <b>{t('home:paragraphs:10_minutes')}</b> {t('home:paragraphs:to_complete')}</p>
        <p>{t('home:paragraphs:after_submitted')} <i>{t('home:paragraphs:openess')}</i></p>
        <p>{t('home:paragraphs:see_an')} <Link route='/result/58a70606a835c400c8b38e84'><a> {t('common:example')}</a></Link> {t('home:paragraphs:of_the_report')}.</p>
        <h2>{t('common:tips')}</h2>
        <p>- {t('home:paragraphs:tip1')}</p>
        <p>- {t('home:paragraphs:tip2')}</p>
        <p>- {t('home:paragraphs:tip3')}</p>
        <h2>{t('common:language')}</h2>
        <form onSubmit={startTest}>
          <p>{t('home:paragraphs:select_language')}</p>
          <Field name={t('common:language')}>
            <Select name='languages' defaultValue={defaultLanguage} options={languageList} />
          </Field>
          <div style={{ textAlign: 'center', paddingTop: '20px' }}>
            <Button value={t('home:paragraphs:start_test')} type='submit' background='rgb(255, 0, 128)' border='1px solid rgb(255, 0, 128)' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default withI18next(['home', 'common'])(Home)
