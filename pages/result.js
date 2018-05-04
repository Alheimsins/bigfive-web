import { Component, Fragment } from 'react'
import { BarChart } from 'react-easy-chart'
import { FaFacebook, FaTwitter, FaGooglePlus } from 'react-icons/lib/fa'
import calculateScore from 'b5-calculate-score'
import getResult from 'b5-result-text'
import axios from 'axios'
import getConfig from 'next/config'
import { Code, Loading, Field, Button, InputText } from '../components/alheimsins'
import GetResults from '../components/GetResults'
const { publicRuntimeConfig } = getConfig()

const httpInstance = axios.create({
  baseURL: publicRuntimeConfig.URL,
  timeout: 2000
})

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

const Summary = ({ title, data, yDomainRange, chartWidth }) => {
  const prepareData = data => data.map(item => Object.assign({'x': item.title, 'y': item.score}))
  const margin = {top: 20, right: 40, bottom: 40, left: 40}
  return (
    <div className='summary-wrapper'>
      {title && <h1>{title}</h1>}
      {data && <BarChart data={prepareData(data)} colorBars axes grid height={400} width={chartWidth} yDomainRange={yDomainRange} margin={margin} />}
      <style jsx>
        {`
          span {
            margin-right: 10px;
          }
          .summary-wrapper {
            border-radius: 0;
            background-color: #FFF;
            box-shadow: 0 2px 2px 0 rgba(0,0,0,.16), 0 0 2px 0 rgba(0,0,0,.12);
            color: black;
            margin-top: 10px;
            padding: 10px;
            text-align: center;
          }
          @media screen and (max-width: 1000px) {
            .summary-wrapper {
              flex-direction: column;
            }
        `}
      </style>
    </div>
  )
}

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
    this.setResults = this.setResults.bind(this)
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

  setResults (results) {
    this.setState({ results })
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
    const currentUrl = publicRuntimeConfig.URL + this.props.path
    return (
      <div>
        <h2>Result</h2>
        {
          loading ? <Loading />
            : resume
              ? <Fragment>
                  <p className='share'>
                    Share on{' '}
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}><FaFacebook /></a>{' '}
                    <a href={`https://twitter.com/home?status=${currentUrl}`}><FaTwitter />{' '}</a>
                    <a href={`https://plus.google.com/share?url=${currentUrl}`}><FaGooglePlus /></a>
                  </p>
                  Save the following ID to see the results later or compare yourself to others - <Code>{ this.props.query.id }</Code>
                  <Resume data={resume} width={this.state.chartWidth} />
                  <style jsx>{` .share { text-align: right; } .share a { color: black; } `}</style>
                </Fragment>
              : <Fragment>
                  <p>If you have taken the test and saved your ID, you can see the results here</p>
                  <p>Type in <i>either</i> the ID you got i.e. <Code>58a70606a835c400c8b38e84</Code> <br />- or -<br/> the link i.e. <Code>https://bigfive-test.com/result/58a70606a835c400c8b38e84</Code><br /> in the <i>ID-input field</i>.</p>
                  <GetResults setResults={this.setResults} />
                </Fragment>
        }
      </div>
    )
  }
}
