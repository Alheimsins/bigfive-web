import { Component, Fragment } from 'react'
import Router from 'next/router'
import calculateScore from 'b5-calculate-score'
import getResult from 'b5-result-text'
import axios from 'axios'
import getConfig from 'next/config'
import { Code, Loading, Field, InputTextUncontrolled, Button } from '../components/alheimsins'
import Summary from '../components/Summary'
import SocialShare from '../components/SocialShare'
import validMongoId from '../lib/valid-mongoid'
import formatId from '../lib/format-id'
const { publicRuntimeConfig } = getConfig()

const httpInstance = axios.create({
  baseURL: publicRuntimeConfig.URL,
  timeout: 5000
})

const AddResult = ({ handleInputSubmit, handleInputChange, error, disabledButton }) => (
  <div style={{ textAlign: 'left' }}>
    <form onSubmit={handleInputSubmit}>
      <Field name='ID'>
        <InputTextUncontrolled name='url' onChange={handleInputChange} placeholder='URL or id for result' autoFocus />
      </Field>
      { error && <p color='red'>{error}</p> }
      <Button value='Get results' type='submit' disabled={disabledButton} />
    </form>
  </div>
)

const Facet = ({ data }) => (
  <div>
    <h2>{data.title}</h2>
    <p>Score: {data.score}/20 - {data.scoreText}</p>
    <p><span dangerouslySetInnerHTML={{__html: data.text}} /></p>
  </div>
)

const Domain = ({ data, chartWidth }) => (
  <div className='domain-wrapper'>
    <h1>{data.title}</h1>
    <p><em>{data.shortDescription}</em></p>
    <p>Score: {data.score}/120 - {data.scoreText}</p>
    <p><strong>{data.text}</strong></p>
    <p><span dangerouslySetInnerHTML={{__html: data.description}} /></p>
    {data && data.facets && <Summary data={data.facets} yDomainRange={[0, 20]} chartWidth={chartWidth} />}
    {data && data.facets && data.facets.map((facet, index) => <Facet data={facet} key={index} />)}
    <style jsx>
      {`
        span {
          margin-right: 10px;
        }
        .domain-wrapper {
          border-radius: 0;
          background-color: #FFF;
          box-shadow: 0 2px 2px 0 rgba(0,0,0,.16), 0 0 2px 0 rgba(0,0,0,.12);
          color: black;
          margin-top: 10px;
          padding: 10px;
          text-align: left;
        }
      `}
    </style>
  </div>
)

const Resume = ({ data, width }) => (
  <div>
    {data && <Summary data={data} yDomainRange={[24, 120]} chartWidth={width} />}
    {data && data.map((domain, index) => <Domain data={domain} key={index} chartWidth={width} />)}
  </div>
)

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chartWidth: 600,
      loading: false
    }
    this.getWidth = this.getWidth.bind(this)
    this.handleInputSubmit = this.handleInputSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  async componentDidMount () {
    document.addEventListener('DOMContentLoaded', this.getWidth(), false)
    window.addEventListener('resize', this.getWidth.bind(this))
    if (this.props.query && this.props.query.id && this.props.query.id.length > 20) {
      this.setState({ loading: true })
      try {
        const { data: results } = await httpInstance.get(`/api/get/${this.props.query.id}`)
        this.setState({ results, loading: false })
      } catch (error) {
        throw error
      }
    }
  }

  getWidth () {
    const width = document.documentElement.clientWidth * 0.9
    this.setState({chartWidth: width >= 500 ? width : 500})
  }

  async handleInputSubmit (e) {
    e.preventDefault()
    const url = formatId(this.state.url)
    const id = validMongoId(url) ? url : false
    if (id) {
      Router.push(`${publicRuntimeConfig.URL}/result/${id}`)
    } else {
      this.setState({ error: 'Not a valid ID' })
    }
  }

  handleInputChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render () {
    const { results, loading, error } = this.state
    const { handleInputSubmit, handleInputChange } = this
    const disabledButton = !validMongoId(formatId(this.state.url))
    let resume
    if (results && results.answers) {
      const scores = calculateScore(results)
      resume = getResult({scores, lang: results.lang || 'en'})
    }
    const currentUrl = publicRuntimeConfig.URL + this.props.path
    return (
      <div>
        <h2>Result</h2>
        {
          loading ? <Loading />
            : resume
              ? <Fragment>
                <SocialShare url={currentUrl} />
                { this.props.query.id && <Fragment>Save the following ID to see the results later or compare yourself to others - <Code>{ this.props.query.id }</Code></Fragment> }
                <Resume data={resume} width={this.state.chartWidth} />
              </Fragment>
              : <Fragment>
                <p>If you have taken the test and saved your ID, you can see the results here by
                typing in <i>either</i> the ID you got i.e. <Code>58a70606a835c400c8b38e84</Code> <br /><i>- or -</i><br /> the link i.e. <Code>{publicRuntimeConfig.URL}/result/58a70606a835c400c8b38e84</Code><br /> in the <i>ID-input field</i>.</p>
                <AddResult handleInputSubmit={handleInputSubmit} handleInputChange={handleInputChange} error={error} disabledButton={disabledButton} />
              </Fragment>
        }
      </div>
    )
  }
}
