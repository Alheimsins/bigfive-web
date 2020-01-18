import { Component } from 'react'
import { Chart } from 'react-google-charts'
import { Loading } from './alheimsins'

const COLORS = [
  '#3366CC',
  '#DC3912',
  '#FF9900',
  '#109618',
  '#990099',
  '#3B3EAC',
  '#0099C6',
  '#DD4477',
  '#66AA00',
  '#B82E2E',
  '#316395',
  '#994499',
  '#22AA99',
  '#AAAA11',
  '#6633CC',
  '#E67300',
  '#8B0707',
  '#329262',
  '#5574A6',
  '#3B3EAC'
]

const prepareData = data =>
  data.map((item, i) => [item.title, item.score, COLORS[i]])

const ColumnChart = ({ title, data, vAxis, chartWidth }) => (
  <Chart
    chartType='ColumnChart'
    style={{ width: '90vw' }}
    data={[
      [{ type: 'string' }, { type: 'number' }, { role: 'style' }],
      ...prepareData(data)
    ]}
    options={{ vAxis, legend: 'none' }}
    width={chartWidth}
    height='500px'
    graph_id={title}
    loader={<Loading />}
  />
)

const PieChart = ({ title, data, vAxis, chartWidth }) => (
  <Chart
    chartType='PieChart'
    style={{ width: '90vw' }}
    data={[
      [{ type: 'string' }, { type: 'number' }, { role: 'style' }],
      ...prepareData(data)
    ]}
    options={{ vAxis, legend: 'none' }}
    width={chartWidth}
    height='500px'
    graph_id={title}
    loader={<Loading />}
  />
)

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chart: 'ColumnChart'
    }
  }

  render () {
    const { chart } = this.state
    return (
      <>
        <div className='pick-chart'>
          <span onClick={() => this.setState({ chart: 'ColumnChart' })} className={chart === 'ColumnChart' ? 'chart selected' : 'chart'}>Column</span>
          <span onClick={() => this.setState({ chart: 'PieChart' })} className={chart === 'PieChart' ? 'chart selected' : 'chart'}>Pie</span>
        </div>
        {
          chart === 'PieChart'
            ? <PieChart {...this.props} />
            : <ColumnChart {...this.props} />
        }
        <style jsx>
          {`
            .pick-chart {
              z-index: 99999;
              position: absolute;
            }
            .chart {
              cursor: pointer;
              margin-left: 4px;
              padding: 5px;
            }
            .selected {
              background-color: rgb(230, 230, 230);
              border-radius: 10px;
            }
          `}
        </style>
      </>
    )
  }
}
