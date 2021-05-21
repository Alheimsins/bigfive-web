import { Radar } from 'react-chartjs-2'

const options = {
  legend: {
    position: 'top'
  },
  title: {
    display: true,
    text: 'Big Five Personality'
  },
  scale: {
    reverse: false,
    gridLines: {
      circular: true
    },
    ticks: {
      beginAtZero: true
    }
  }
}
// const data = {
//   labels: [
//     "Openness",
//     "Conscientiousness",
//     "Extraversion",
//     "Agreeableness",
//     "Neuroticism"
//   ],
//   datasets: [
//     {
//       label: 'My Personality',
//       backgroundColor: "rgba(139,0,213,0.4)",
//       pointBackgroundColor: "rgba(220,220,220,1)",
//       data: [
//         0.5,
//         0.8,
//         0.3,
//         0.5,
//         0.3
//       ]
//     }
//   ]
// }

const processData = props => {
  console.log(props)
  const title = props.title
  const labels = props.data.map(facet => {
    return facet.title
  })
  const dataset = props.data.map(facet => {
    return facet.score / (5 * facet.count)
  })
  var r = () => Math.random() * 256 >> 0
  var color = `rgb(${r()}, ${r()}, ${r()})`
  return {
    labels: labels,
    datasets: [
      {
        label: title,
        backgroundColor: color,
        pointBackgroundColor: 'rgba(220,220,220,1)',
        data: dataset
      }
    ]
  }
}

const RadarChart = (props) => {
  return (
    <div>
      <Radar
        width={20}
        height={20}
        data={processData(props)}
        options={options}
      />
    </div>
  )
}
export default RadarChart
