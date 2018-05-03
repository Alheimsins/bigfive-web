import { Fragment } from 'react'

export default () => (
  <Fragment>
    <span className='loading'>
      <p>
        <img src='/static/loading.svg' style={{width: 100}} />
      </p>
      <p>
        <big>LOADING ...</big>
      </p>
      <style jsx>
        {`
        .loading {
          text-align: center;
        }
      `}
      </style>
    </span>
  </Fragment>
)
