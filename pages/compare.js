import { Component } from 'react'
import { BarChart } from 'react-easy-chart'
import calculateScore from 'b5-calculate-score'
import getResult from 'b5-result-text'
import axios from 'axios'
import getConfig from 'next/config'
import { Loading, Field, Button, InputText } from '../components/alheimsins'
const { publicRuntimeConfig } = getConfig()

const httpInstance = axios.create({
  baseURL: publicRuntimeConfig.URL,
  timeout: 1000
})

const CompareAdd = ({ handleSubmit, handleChange, error, name, url, people }) => (
  <div style={{ textAlign: 'left' }}>
    { people && people.length > 0 && people.map(person =>
      <div key={person.url} className='persons'>
        <b>{person.name}</b> - <i>{person.url}</i>
      </div>
    )}
    { people && people.length >= 2 && <Button value='Compare people' /> }
    <form onSubmit={handleSubmit} style={{ marginTop: '40px' }}>
      <Field name='Name'>
        <InputText name='name' value={name} onChange={handleChange} placeholder='Name for comparison' />
      </Field>
      <Field name='ID'>
        <InputText name='url' value={url} onChange={handleChange} placeholder='URL or id for comparison' />
      </Field>
      { error && <p color='red'>{error}</p> }
      <Button value='Add' type='submit' disabled={!url || !name} />
    </form>
    <style jsx>
      {`
        .persons {
          padding: 8px;
          font-size: 12px;
        }
        .persons:nth-of-type(even) {
          background: rgb(234, 234, 234);
        }
      `}
    </style>
  </div>
)

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chartWidth: 600,
      loading: false,
      people: []
    }
    this.getWidth = this.getWidth.bind(this)
    this.setResults = this.setResults.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount () {
    document.addEventListener('DOMContentLoaded', this.getWidth(), false)
    window.addEventListener('resize', this.getWidth.bind(this))
  }

  setResults (results) {
    this.setState({ results })
  }

  handleChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit (e) {
    e.preventDefault()
    const name = this.state.name
    const url = this.state.url
    this.setState({ name: '', url: '', people: [...this.state.people, { name, url }] })
  }

  getWidth () {
    const width = document.documentElement.clientWidth * 0.9
    this.setState({chartWidth: width >= 500 ? width : 500})
  }

  render () {
    const { results, loading } = this.state
    let resume
    if (results && results.answers) {
      const scores = calculateScore(results)
      resume = getResult({scores, lang: results.lang || 'en'})
    }
    return (
      <div>
        <h2>Compare</h2>
        {
          loading ?
            <Loading />
          : resume
            ? <div>asd</div>
            : <CompareAdd
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                name={this.state.name}
                url={this.state.url}
                people={this.state.people}
              />
        }
      </div>
    )
  }
}
