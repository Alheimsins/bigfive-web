import { Component, Fragment } from 'react'
import axios from 'axios'
import getConfig from 'next/config'
import Router from 'next/router'
import { Code, Loading, Field, Button, InputText } from '../components/alheimsins'
import { MdDelete } from 'react-icons/lib/md'
import Summary from '../components/Summary'
import SocialShare from '../components/SocialShare'
import repackResults from '../lib/repack-results'
import base64url from '../lib/base64url'
import validMongoId from '../lib/valid-mongoid'
import formatId from '../lib/format-id'
const { publicRuntimeConfig } = getConfig()

const httpInstance = axios.create({
  baseURL: publicRuntimeConfig.URL,
  timeout: 8000
})

const DomainScores = ({data, chartWidth}) => {
  return (
    <div>
      <Summary title={data.title} data={data.scores} yDomainRange={[0, 120]} chartWidth={chartWidth} />
      <p>{data.description}</p>
      <Facets facets={data.facets} chartWidth={chartWidth} />
    </div>
  )
}

const FacetScores = ({data, chartWidth}) => {
  return (
    <div>
      <Summary title={data.title} data={data.scores} yDomainRange={[0, 20]} chartWidth={chartWidth} />
      <p>{data.description}</p>
    </div>
  )
}

const Facets = ({facets, chartWidth}) => {
  return facets.map((facet, index) => <FacetScores data={facet} chartWidth={chartWidth} key={index} />)
}

const Comparisons = ({ data, chartWidth }) => (
  <div>
    {data.map((domain, index) => <DomainScores data={domain} chartWidth={chartWidth} key={index} />)}
  </div>
)

const CompareAdd = ({ handleAdd, handleDelete, handleChange, handleCompare, error, name, id, people }) => {
  const formatUrl = formatId(id)
  return (
    <div style={{ textAlign: 'left' }}>
      { people && people.length > 0 && people.map((person, i) =>
        <div key={i} className='persons'>
          <a title='Delete' onClick={() => handleDelete(i)}>
            <MdDelete style={{ cursor: 'pointer', marginRight: '10px' }} />
          </a>
          <b>{person.name}</b> - <i>{person.id}</i>
        </div>
      )}
      { people && people.length >= 2 && <Button value='Compare people' onClick={handleCompare} /> }
      <form onSubmit={handleAdd} style={{ marginTop: '40px' }}>
        <Field name='Name'>
          <InputText name='name' value={name} onChange={handleChange} placeholder='Name for comparison' autoComplete='off' autoFocus />
        </Field>
        <Field name='ID'>
          <InputText name='id' value={id} onChange={handleChange} placeholder='URL or id for comparison' autoComplete='off' />
        </Field>
        { error && <p color='red'>{error}</p> }
        <Button value='Add' type='submit' disabled={!validMongoId(formatUrl) || !id || !name} />
      </form>
      <style jsx>
        {`
          .persons {
            padding: 8px;
            font-size: 14px;
          }
          .persons a {
            font-size: 18px;
          }
          .persons:nth-of-type(even) {
            background: rgb(234, 234, 234);
          }
        `}
      </style>
    </div>
  )
}

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
    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCompare = this.handleCompare.bind(this)
  }

  async componentDidMount () {
    document.addEventListener('DOMContentLoaded', this.getWidth(), false)
    window.addEventListener('resize', this.getWidth.bind(this))
    if (this.props.query && this.props.query.id) {
      this.setState({ loading: true })
      const people = base64url.decode(this.props.query.id)
      const scores = await Promise.all(people.map(async item => {
        const { data } = await httpInstance.get(`/api/get/${item.id}`)
        return { data, name: item.name }
      }))
      const comparison = repackResults(scores, scores[0].data.lang)
      this.setState({ comparison, loading: false })
    }
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

  handleAdd (e) {
    e.preventDefault()
    const name = this.state.name
    const id = formatId(this.state.id)
    this.setState({ name: '', id: '', people: [ ...this.state.people, { name, id } ] })
  }

  handleCompare () {
    const people = JSON.stringify(this.state.people)
    console.log(people)
    const urlCompare = base64url.encode(people)
    console.log(urlCompare)
    Router.push(`${publicRuntimeConfig.URL}/compare/${urlCompare}`)
  }

  getWidth () {
    const width = document.documentElement.clientWidth * 0.9
    this.setState({chartWidth: width >= 500 ? width : 500})
  }

  render () {
    const { loading, comparison } = this.state
    const currentUrl = publicRuntimeConfig.URL + this.props.path
    return (
      <div>
        <h2>Compare</h2>
        {
          loading
            ? <Loading />
            : comparison
              ? <Fragment>
                <SocialShare url={currentUrl} />
                <Comparisons data={comparison} chartWidth={this.state.chartWidth} />
              </Fragment>
              : <Fragment>
                <p>Compare results from the bigfive personality test with multiple people.</p>
                <p>Type in <i>either</i> the ID you got i.e. <Code>58a70606a835c400c8b38e84</Code> <br /><i>- or -</i><br /> the link i.e. <Code>{publicRuntimeConfig.URL}/result/58a70606a835c400c8b38e84</Code><br /> in the <i>ID-input field</i>.</p>
                <CompareAdd
                  handleChange={this.handleChange}
                  handleDelete={this.handleDelete}
                  handleAdd={this.handleAdd}
                  handleCompare={this.handleCompare}
                  name={this.state.name}
                  id={this.state.id}
                  people={this.state.people}
                />
              </Fragment>
        }
      </div>
    )
  }
}
