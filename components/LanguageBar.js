const { getInfo } = require('b5-johnson-120-ipip-neo-pi-r')
const { languages } = getInfo()

export default ({ switchLanguage, selectedLanguage }) => (
  <div className='lang'>
    { languages.map(langCode => <span key={langCode} onClick={() => switchLanguage(langCode)} className={selectedLanguage === langCode ? 'languageSelected' : 'language'}>{langCode} </span>) }
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
