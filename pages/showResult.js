import { Component, Fragment } from 'react'
import calculateScore from 'b5-calculate-score'
import getResult from 'b5-result-text'
import axios from 'axios'
import { Code } from '../components/alheimsins'
import getConfig from 'next/config'
import Summary from '../components/Summary'
import SocialShare from '../components/SocialShare'
import validMongoId from '../lib/valid-mongoid'
import formatId from '../lib/format-id'
const { publicRuntimeConfig: { URL } } = getConfig()

const httpInstance = axios.create({
  baseURL: URL,
  timeout: 5000
})

const getResultFromId = async id => {
  try {
    const formattedId = formatId(id)
    if (!validMongoId(formattedId)) throw new Error('Invalid id')
    const { data } = await httpInstance.get(`/api/get/${formattedId}`)
    const scores = calculateScore(data)
    return getResult({scores, lang: data.lang || 'en'})
  } catch (error) {
    throw error
  }
}

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
  static async getInitialProps ({ query }) {
    if (query.id) {
      const results = await getResultFromId(query.id)
      return { results }
    }
    return {}
  }

  constructor (props) {
    super(props)
    this.state = {
      chartWidth: 600
    }
    this.getWidth = this.getWidth.bind(this)
  }

  async componentDidMount () {
    document.addEventListener('DOMContentLoaded', this.getWidth(), false)
    window.addEventListener('resize', this.getWidth.bind(this))
    if (this.props.results) {
      this.setState({ results: this.props.results })
    }
  }

  getWidth () {
    const width = document.documentElement.clientWidth * 0.9
    this.setState({chartWidth: width >= 500 ? width : 500})
  }

  render () {
    const { results, chartWidth } = this.state
    const { id } = this.props.query
    const currentUrl = URL + '/result/' + id
    return (
      <div>
        <h2>Result</h2>
        {
          results &&
          <Fragment>
            <SocialShare url={currentUrl} />
            { id && <Fragment>Save the following ID to see the results later or compare yourself to others - <Code>{ id }</Code></Fragment> }
            <Resume data={results} width={chartWidth} />
          </Fragment>
        }
      </div>
    )
  }
}
