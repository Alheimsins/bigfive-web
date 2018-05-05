import { Component } from 'react'
import { Field, Button, InputTextUncontrolled } from '../components/alheimsins'
import getConfig from 'next/config'
import Router from 'next/router'
const { publicRuntimeConfig } = getConfig()
const validMongoId = id => /^[0-9a-fA-F]{24}$/.test(id)
const formatId = id => /^((http|https):\/\/)/.test(id) ? id.replace(publicRuntimeConfig.URL + '/result/', '').replace(' ', '') : id ? id.replace(' ', '') : id

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit (e) {
    e.preventDefault()
    const url = formatId(this.state.url)
    const id = validMongoId(url) ? url : false
    if (id) {
      Router.push(`${publicRuntimeConfig.URL}/result/${id}`)
    } else {
      this.setState({ error: 'Not a valid ID' })
    }
  }

  handleChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render () {
    const disabledButton = !validMongoId(formatId(this.state.url))
    return (
      <div style={{ textAlign: 'left' }}>
        <form onSubmit={this.handleSubmit}>
          <Field name='ID'>
            <InputTextUncontrolled name='url' onChange={this.handleChange} placeholder='URL or id for result' autoFocus />
          </Field>
          { this.state.error && <p color='red'>{this.state.error}</p> }
          <Button value='Get results' type='submit' disabled={disabledButton} />
        </form>
      </div>
    )
  }
}
