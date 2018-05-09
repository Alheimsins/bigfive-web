import { Component, Fragment } from 'react'
import getConfig from 'next/config'
import { Router } from '../routes'
import validMongoId from '../lib/valid-mongoid'
import formatId from '../lib/format-id'
import { Code, Field, InputTextUncontrolled, Button } from '../components/alheimsins'
const { publicRuntimeConfig: { URL } } = getConfig()

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleInputSubmit = this.handleInputSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputSubmit (e) {
    e.preventDefault()
    const id = formatId(this.state.id)
    Router.pushRoute('showResult', { id })
  }

  handleInputChange (e) {
    this.setState({ id: e.target.value })
  }

  render () {
    const { handleInputSubmit, handleInputChange } = this
    const { error, id } = this.state
    const disabledButton = !validMongoId(formatId(id))
    return (
      <Fragment>
        <p>If you have taken the test and saved your ID, you can see the results here by
          typing in <i>either</i> the ID you got i.e. <Code>58a70606a835c400c8b38e84</Code> <br /><i>- or -</i><br /> the link i.e. <Code>{URL}/result/58a70606a835c400c8b38e84</Code><br /> in the <i>ID-input field</i>.</p>
        <div style={{ textAlign: 'left' }}>
          <form onSubmit={handleInputSubmit}>
            <Field name='ID'>
              <InputTextUncontrolled name='id' onChange={handleInputChange} placeholder='URL or id for result' autoFocus />
            </Field>
            { error && <p color='red'>{error}</p> }
            <Button value='Get results' type='submit' disabled={disabledButton} />
          </form>
        </div>
      </Fragment>
    )
  }
}
