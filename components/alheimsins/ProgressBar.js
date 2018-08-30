export default ({ progress }) => (
  <div className='progress' style={{ color: progress > 52 ? '#fff' : '#828282' }}>
    <span className='percent'>
      {progress}%
    </span>
    <div style={{ width: progress + '%' }} className='bar' />
    <style>
      {`
        .progress {
          background-color: #f1f1f1;
          height: 100%;
          margin-top: 3%;
          border: 1px;
          border-radius: 5px;
          width: 100%;
        }
        .percent {
          position: absolute;
          left: 50%;
        }
        .bar {
          height: 20px;
          background-color: #000;
          transition: width 2s;
          border: 1px;
          border-radius: 5px;
        }
      `}
    </style>
  </div>
)
