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

export default ({ title, data, vAxis, chartWidth }) => (
  <Chart
    chartType='ColumnChart'
    style={{ width: '100vw' }}
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
