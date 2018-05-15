import { Component } from 'react'
import { Router, Link } from '../routes'
import { Select, Button, Field } from '../components/alheimsins'
import { FaExternalLink } from 'react-icons/lib/fa'
import ISO6391 from 'iso-639-1'
import { getInfo } from 'b5-johnson-120-ipip-neo-pi-r'
const { languages } = getInfo()

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lang: 'en'
    }
    this.setLang = this.setLang.bind(this)
  }

  setLang ({ target }) {
    this.setState({ lang: target.value })
  }

  render () {
    const languageList = languages.map(code => ({ code, name: ISO6391.getName(code) }))
    return (
      <div>
        <div style={{ paddingBottom: '20px', borderBottom: '1px solid rgb(234, 234, 234)' }}>
          <h1>BigFive personality test</h1>
        </div>
        <div style={{ maxWidth: '650px', textAlign: 'left', margin: 'auto', fontSize: '14px', width: '100%' }}>
          <p>This is a <b>free</b>, open-source personality test to measure the big five personality traits.
          </p>
          <p>
          Tests and evaluation is gathered from <a href='http://ipip.ori.org' rel='noopener' target='_blank'>ipip.ori.org</a><FaExternalLink size='8' style={{ verticalAlign: 'top' }} />, the
          inventory is from <i>Johnson's (2014) 120-item IPIP NEO-PI-R</i>.
          </p>
          <p>The following test contains <b>120 questions</b> who is estimated to take you about <b>10 minutes</b>.</p>
          <p>After you have submitted the test you will receive a detailed personality report in the following domains: <i>Openness to experience, Conscientiousness, Extraversion, Agreeableness and Neuroticism. </i></p>
          <p>See an <Link route='/result/58a70606a835c400c8b38e84'><a>example</a></Link> of the report.</p>
          <h2>Tips</h2>
          <p>- Answer honestly, even if you don't like the answer</p>
          <p>- Describe yourself as you generally are now, not as you wish to be in the future</p>
          <p>- Your spontaneous answer is usually the most accurate</p>
          <h2>Language</h2>
          <p>Select the language in which you want to see the test displayed in</p>
          <Field name='Language'>
            <Select name='languages' onChange={this.setLang} defaultValue='en' options={languageList} />
          </Field>
          <div style={{ textAlign: 'center', paddingTop: '20px' }}>
            <Button value='start test' onClick={() => Router.pushRoute(`/test/${this.state.lang}`)} />
          </div>
        </div>
      </div>
    )
  }
}
