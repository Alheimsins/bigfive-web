import { BarChart } from 'react-easy-chart'

const margin = {top: 20, right: 40, bottom: 40, left: 40}

const prepareData = (data) => data.map(item => Object.assign({'x': item.title, 'y': item.score}))

export default ({ title, data, yDomainRange, chartWidth }) => {
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
