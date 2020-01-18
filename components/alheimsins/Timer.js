import { Component } from 'react'

const secToMin = seconds => {
  const minuteDivisor = seconds % (60 * 60)
  const minutes = Math.floor(minuteDivisor / 60)
  const secondDivisor = minuteDivisor % 60
  let remSecs = Math.ceil(secondDivisor)

  switch (seconds) {
    case seconds < 10:
      return `0:0${seconds}`
    case seconds < 60:
      return `0:${seconds}`
    default:
      if (remSecs < 10 && remSecs > 0) remSecs = `0${remSecs}`
      if (remSecs === 0) remSecs = `${remSecs}0`
      return `${minutes}:${remSecs}`
  }
}

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      elapsed: 0
    }
    this.tick = this.tick.bind(this)
  }

  componentDidMount () {
    this.timer = setInterval(this.tick, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  tick () {
    this.setState({ elapsed: new Date() - this.props.start })
  }

  render () {
    const seconds = Math.round(this.state.elapsed / 1000)
    return <div>{secToMin(seconds)}</div>
  }
}
