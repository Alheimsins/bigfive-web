import { Chart } from '@alheimsins/react-google-charts'
import { Loading } from './alheimsins'

export default ({ title, data, header, vAxis, chartWidth }) => (
  <Chart
    chartType='ColumnChart'
    data={[['domain', ...header], ...data]}
    options={{ vAxis }}
    width={chartWidth}
    height='500px'
    graph_id={title}
    legend_toggle={false}
    loader={<Loading />}
  />
)
