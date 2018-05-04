import { Component, Fragment } from 'react'
import { BarChart } from 'react-easy-chart'
import calculateScore from 'b5-calculate-score'
import getResult from 'b5-result-text'
import axios from 'axios'
import getConfig from 'next/config'
import { Code, Loading, Field, Button, InputText } from '../components/alheimsins'
import { MdDelete } from 'react-icons/lib/md'
const { publicRuntimeConfig } = getConfig()

const httpInstance = axios.create({
  baseURL: publicRuntimeConfig.URL,
  timeout: 1000
})

const CompareAdd = ({ handleSubmit, handleDelete, handleChange, error, name, url, people }) => (
  <div style={{ textAlign: 'left' }}>
    { people && people.length > 0 && people.map((person, i) =>
      <div key={i} className='persons'>
        <a title='Delete' onClick={() => handleDelete(i)}>
          <MdDelete style={{ cursor: 'pointer', marginRight: '10px' }}/>
        </a>
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
          font-size: 14px;
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
    this.handleDelete = this.handleDelete.bind(this)
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

  handleDelete (num) {
    const people = this.state.people
    people.splice(num, 1)
    this.setState({ people: [ ...people ] })
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
          loading
            ? <Loading />
            : resume
              ? <div>asd</div>
              : <Fragment>
                  <p>Compare results from the bigfive personality test with multiple people.</p>
                  <p>Type in <i>either</i> the ID you got i.e. <Code>58a70606a835c400c8b38e84</Code> <br />- or -<br/> the link i.e. <Code>https://bigfive-test.com/result/58a70606a835c400c8b38e84</Code><br /> in the <i>ID-input field</i>.</p>
                  <CompareAdd
                    handleChange={this.handleChange}
                    handleDelete={this.handleDelete}
                    handleSubmit={this.handleSubmit}
                    name={this.state.name}
                    url={this.state.url}
                    people={this.state.people}
                  />
                </Fragment>
        }
      </div>
    )
  }
}
