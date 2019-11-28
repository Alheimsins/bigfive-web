import { Component } from 'react'
import PropTypes from 'prop-types'
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md'

export default class Radio extends Component {
  render () {
    const { name, checked, onChange } = this.context.radioGroup
    const choosen = checked === this.props.value
    return [
      <label key={this.props.value}>
        <input type='radio' name={name} value={this.props.value} checked={choosen} onChange={onChange} />
        <span className='radios' style={this.props.style}>
          {choosen
            ? <span role='radio' className={this.props.color ? `color${this.props.color}` : 'checked'}><MdRadioButtonChecked /></span>
            : <span role='radio' className='unchecked'><MdRadioButtonUnchecked /></span>}
            &nbsp;
          {this.props.text}
        </span>
        <style jsx>
          {`
            input {
              display: none;
            }
            .radios {
              cursor: pointer;
              margin-right: 5px;
            }
            .checked {
              color: ${this.props.checkedColor || 'black'}
            }
            .color5 { color: #FF0080 }
            .color4 { color: #FF47A3 }
            .color3 { color: #FF70B8 }
            .color2 { color: #FF85C2 }
            .color1 { color: #FFADD6 }
            .unchecked {
              fill: ${this.props.uncheckedColor || 'black'}
            }
            @media screen and (max-width: 800px) {
              .radios {
                margin-top: 4px;
                font-size: 18px;
              }
            }
          `}
        </style>
      </label>
    ]
  }
}

Radio.contextTypes = {
  radioGroup: PropTypes.object
}
