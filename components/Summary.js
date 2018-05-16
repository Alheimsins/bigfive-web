import { Chart } from 'react-google-charts'
const prepareData = data => data.map((item, i) => ([ item.title, item.score ]))

export default ({ title, data, vAxis, chartWidth }) => (
  <Chart
    chartType='ColumnChart'
    columns={[ {type: 'string'}, {type: 'number'} ]}
    rows={prepareData(data)}
    options={{vAxis, legend: 'none'}}
    width={chartWidth}
    height='500px'
    graph_id={title}
  />
)
