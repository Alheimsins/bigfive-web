export default () => (
  <div className='loading'>
    <img src='/static/spinner.gif' style={{ width: 30 }} />
    <big style={{ marginLeft: '8px', verticalAlign: 'text-bottom' }}>LOADING ...</big>
    <style jsx>
      {`
      .loading {
        text-align: center;
        line-height: 34px;
      }
    `}
    </style>
  </div>
)
