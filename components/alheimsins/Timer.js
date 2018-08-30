import { Component } from 'react'

const secToMin = seconds => {
  switch (seconds) {
    case seconds < 10:
      return `0:0${seconds}`
    case seconds < 60:
      return `0:${seconds}`
    default:
      const minuteDivisor = seconds % (60 * 60)
      const minutes = Math.floor(minuteDivisor / 60)

      const secondDivisor = minuteDivisor % 60
      let remSecs = Math.ceil(secondDivisor)

      if (remSecs < 10 && remSecs > 0) remSecs = `0${remSecs}`
      if (remSecs === 0) remSecs = `${remSecs}0`
      const time = {
        m: minutes,
        s: remSecs
      }
      return `${time.m}:${time.s}`
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
    let seconds = Math.round(this.state.elapsed / 1000)
    return <div>{secToMin(seconds)}</div>
  }
}
