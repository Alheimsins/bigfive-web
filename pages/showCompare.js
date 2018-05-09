import { Component, Fragment } from 'react'
import axios from 'axios'
import getConfig from 'next/config'
import Summary from '../components/Summary'
import SocialShare from '../components/SocialShare'
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

const Comparison = ({data, chartWidth}) => {
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
      chartWidth: 600,
      people: []
    }
    this.getWidth = this.getWidth.bind(this)
  }

  async componentDidMount () {
    document.addEventListener('DOMContentLoaded', this.getWidth(), false)
    window.addEventListener('resize', this.getWidth.bind(this))
    if (this.props.comparison) {
      this.setState({ comparison: this.props.comparison })
    }
  }

  getWidth () {
    const width = document.documentElement.clientWidth * 0.9
    this.setState({chartWidth: width >= 500 ? width : 500})
  }

  render () {
    const { comparison, chartWidth } = this.state
    const { id } = this.props.query
    const currentUrl = URL + '/compare/' + id
    return (
      <div>
        <h2>Compare</h2>
        {
          comparison &&
            <Fragment>
              <SocialShare url={currentUrl} />
              <div>
                {comparison.map((domain, index) => <Comparison data={domain} chartWidth={chartWidth} key={index} />)}
              </div>
            </Fragment>
        }
      </div>
    )
  }
}
