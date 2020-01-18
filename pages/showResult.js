import { Component } from 'react'
import calculateScore from 'b5-calculate-score'
import getResult from '@alheimsins/b5-result-text'
import axios from 'axios'
import { Code } from '../components/alheimsins'
import getConfig from 'next/config'
import Summary from '../components/Summary'
import Domain from '../components/Domain'
import SocialShare from '../components/SocialShare'
import validMongoId from '../lib/valid-mongoid'
import formatId from '../lib/format-id'
const { publicRuntimeConfig: { URL } } = getConfig()

const httpInstance = axios.create({
  baseURL: URL,
  timeout: 8000
})

const getResultFromId = async id => {
  const formattedId = formatId(id)
  if (!validMongoId(formattedId)) throw new Error('Invalid id')
  const { data } = await httpInstance.get(`/api/get/${formattedId}`)
  const scores = calculateScore(data)
  return getResult({ scores, lang: data.lang || 'en' })
}

const Resume = ({ data, chartWidth }) => (
  <div>
    {data && <div className='domains'><Summary data={data} vAxis={{ minValue: 0, maxValue: 120 }} chartWidth={chartWidth} /></div>}
    {data && data.map((domain, index) => <Domain data={domain} key={index} chartWidth={chartWidth} />)}
    <style jsx>
      {`
        .domains {
          box-shadow: 0 2px 2px 0 rgba(0,0,0,.16), 0 0 2px 0 rgba(0,0,0,.12);
          margin-top: 10px;
          padding: 10px;
          text-align: left;
        }
      `}
    </style>
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

  componentDidMount () {
    window.addEventListener('resize', this.getWidth)
    if (this.props.results) {
      this.setState({ results: this.props.results })
    }
    this.getWidth()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.getWidth)
  }

  getWidth () {
    const chartWidth = window.innerWidth * 0.85
    this.setState({ chartWidth })
  }

  render () {
    const { results, chartWidth } = this.state
    const { id } = this.props.query
    const currentUrl = URL + '/result/' + id
    return (
      <>
        <h2>Result</h2>
        {
          results &&
            <>
              <SocialShare url={currentUrl} />
              {id && <>Save the following ID to see the results later or compare yourself to others - <Code>{id}</Code></>}
              <Resume data={results} chartWidth={chartWidth} />
              <SocialShare url={currentUrl} />
            </>
        }
      </>
    )
  }
}
