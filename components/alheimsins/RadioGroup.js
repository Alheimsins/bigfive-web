import React from 'react'
import PropTypes from 'prop-types'

export default class RadioGroup extends React.Component {
  getChildContext () {
    const { name, checked, onChange } = this.props
    return {
      radioGroup: {
        name, checked, onChange
      }
    }
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

RadioGroup.childContextTypes = {
  radioGroup: PropTypes.object
}
