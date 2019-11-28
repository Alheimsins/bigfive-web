export default (props) => (
  <div className='field' style={{ ...props.style }}>
    <label htmlFor={props.name}>
      {props.name.toUpperCase()}:
    </label>
    {props.children}
    <style jsx>
      {`
        .field {
          margin-bottom: 30px;
          border-bottom: 1px solid #d8d8d8;
          width: 100%;
        }
        .field:focus-within, .field:focus {
          border-bottom: 1px solid #000 !important;
        }
        label {
          margin-right: 2px;
          display: inline-block;
          width: 80px;
          font-size: 11px;
          font-weight: bold;
        }
      `}
    </style>
  </div>
)
