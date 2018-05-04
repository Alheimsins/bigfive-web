import { Component } from 'react'
import { Field, Button, InputText } from '../components/alheimsins'
import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const validMongoId = id => /^[0-9a-fA-F]{24}$/.test(id)

const httpInstance = axios.create({
  baseURL: publicRuntimeConfig.URL,
  timeout: 1000
})

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit (e) {
    e.preventDefault()
    const id = validMongoId(this.state.url) ? this.state.url : false
    if (id) {
      try {
        const { data: results } = await httpInstance.get(`/api/get/${id}`)
        this.props.setResults(results)
      } catch (error) {
        this.setState({ error: error })
      }
    } else {
      this.setState({ error: 'Not a valid ID' })
    }
  }

  handleChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render () {
    return (
      <div style={{ textAlign: 'left' }}>
        <form onSubmit={this.handleSubmit}>
          <Field name='ID'>
            <InputText name='url' onChange={this.handleChange} placeholder='URL or id for result' />
          </Field>
          { this.state.error && <p color='red'>{this.state.error}</p> }
          <Button value='Get results' type='submit' disabled={!this.state.url} />
        </form>
      </div>
    )
  }
}
