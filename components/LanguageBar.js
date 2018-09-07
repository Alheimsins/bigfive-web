import { Component } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
const { getInfo } = require('b5-johnson-120-ipip-neo-pi-r')
const { languages } = getInfo()

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toggleLang: false
    }
    this.toggleLang = this.toggleLang.bind(this)
  }

  toggleLang () {
    this.setState({ toggleLang: !this.state.toggleLang })
  }

  render () {
    const { switchLanguage, selectedLanguage } = this.props
    return (
      <div className='lang'>
        {
          !this.state.toggleLang &&
            languages.filter(langCode => langCode === 'en' || selectedLanguage === langCode).map(langCode => <span key={langCode} onClick={() => switchLanguage(langCode)} className={selectedLanguage === langCode ? 'languageSelected' : 'language'}>{langCode} </span>)
        }
        {
          this.state.toggleLang &&
            languages.map(langCode => <span key={langCode} onClick={() => switchLanguage(langCode)} className={selectedLanguage === langCode ? 'languageSelected' : 'language'}>{langCode} </span>)
        }
        <span className='language' onClick={this.toggleLang}> { this.state.toggleLang ? <FaAngleLeft /> : <FaAngleRight /> }</span>
        <style jsx>
          {`
            .language {
              padding: 5px;
              cursor: pointer;
              margin-left: 4px;
            }
            .languageSelected {
              padding: 2px;
              cursor: pointer;
              margin-left: 4px;
              border-radius: 10px;
              padding: 5px;
              background-color: #e6e6e6;
            }
          `}
        </style>
      </div>
    )
  }
}
