import { Component, Fragment } from 'react'
import axios from 'axios'
import getConfig from 'next/config'
import Summary from '../components/SummaryCompare'
import SocialShare from '../components/SocialShare'
import { ShortcutH1 } from '../components/alheimsins'
import repackResults from '../lib/repack-results'
import base64url from '../lib/base64url'
const { publicRuntimeConfig: { URL } } = getConfig()

const httpInstance = axios.create({
  baseURL: URL,
  timeout: 8000
})

const getCompareFromId = async id => {
  const people = base64url.decode(id)
  const scores = await Promise.all(people.map(async item => {
    const { data } = await httpInstance.get(`/api/get/${item.id}`)
    return { data, name: item.name }
  }))
  return repackResults(scores, scores[0].data.lang)
}

const Comparison = ({ data, chartWidth }) => {
  const header = data[0].scores.map(({ title }) => ({ label: title, type: 'number' }))
  const domainScores = data.map(result => ([result.title, ...result.scores.map(({ score }) => score)]))
  const domains = data.map(result => ({ title: result.title, description: result.description }))
  const facets = data.map(({ facets }) => ([...facets]))
  const getFacetScores = i => facets[i].map(({ title, scores }) => [title, ...scores.map(({ score }) => score)])
  return (
    <>
      <h1>Overview</h1>
      <Summary data={domainScores} header={header} vAxis={{ minValue: 24, maxValue: 120 }} chartWidth={chartWidth} title='domain' />
      {
        domains.map((domain, i) => (
          <Fragment key={i}>
            <ShortcutH1 name={domain.title} />
            <p>{domain.description}</p>
            <Summary data={getFacetScores(i)} header={header} vAxis={{ minValue: 4, maxValue: 20 }} chartWidth={chartWidth} title={domain.title} />
          </Fragment>
        ))
      }
    </>
  )
}

export default class extends Component {
  static async getInitialProps ({ query }) {
    if (query.id) {
      const comparison = await getCompareFromId(query.id)
      return { comparison }
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

  componentDidMount () {
    window.addEventListener('resize', this.getWidth)
    if (this.props.comparison) {
      this.setState({ comparison: this.props.comparison })
    }
    this.getWidth()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  getWidth () {
    const chartWidth = window.innerWidth * 0.8
    this.setState({ chartWidth })
  }

  render () {
    const { comparison, chartWidth } = this.state
    const { id } = this.props.query
    const currentUrl = URL + '/compare/' + id
    return (
      <>
        <h2>Compare</h2>
        {
          comparison &&
            <>
              <SocialShare url={currentUrl} />
              <Comparison data={comparison} chartWidth={chartWidth} />
              <SocialShare url={currentUrl} />
            </>
        }
      </>
    )
  }
}
