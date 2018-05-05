import { Component } from 'react'
import Router from 'next/router'
import { Button, RadioGroup, Radio } from '../components/alheimsins'
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
    return (
      <div>
        <div style={{ paddingBottom: '20px', borderBottom: '1px solid rgb(234, 234, 234)' }}>
          <h1>BigFive personality test</h1>
        </div>
        <div style={{ maxWidth: '650px', textAlign: 'left', margin: 'auto', fontSize: '14px', width: '100%' }}>
          <p>This is a <b>free</b>, open-source personality test to measure the big five personality traits.
          </p>
          <p>
          Tests and evaluation is gathered from <a href='http://ipip.ori.org' target='_blank'>ipip.ori.org</a>, the
          inventory is from <i>Johnson's (2014) 120-item IPIP NEO-PI-R</i>.
          </p>
          <p>The following test contains <b>120 questions</b> who is estimated to take you about <b>10 minutes</b>.</p>
          <p>After you have submitted the test you will receive a detailed personality report in the following domains: <i>Openness to experience, Conscientiousness, Extraversion, Agreeableness and Neuroticism.</i></p>
          <h2>Tips</h2>
          <p>- Answer honestly, even if you don't like the answer</p>
          <p>- Describe yourself as you generally are now, not as you wish to be in the future</p>
          <p>- Your spontaneous answer is usually the most accurate</p>
          <h2>Language</h2>
          <p>Select the language in which you want to see the test displayed in</p>
          <RadioGroup name='languages' checked={this.state.lang} onChange={this.setLang}>
            { languages.map(langCode =>
              <Radio key={langCode} color='5' value={langCode} text={ISO6391.getName(langCode)} />
            )}
          </RadioGroup>
          <div style={{ textAlign: 'center', paddingTop: '20px' }}>
            <Button value='start test' onClick={() => Router.push(`/test/${this.state.lang}`)} />
          </div>
        </div>
      </div>
    )
  }
}
