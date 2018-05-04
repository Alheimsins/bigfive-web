export default function InputText (props) {
  const propTypes = {
    name: props.name,
    type: props.type || 'text',
    min: props.min,
    max: props.max,
    maxLength: props.maxLength,
    placeholder: props.placeholder,
    onChange: props.onChange,
    autoFocus: props.autoFocus
  }
  return (
    <div>
      <input {...propTypes} />
      <style jsx>
        {`
          input {
            border-width: 0;
            background: transparent;
            height: 18px;
            -moz-appearance: textfield;
            width: 100%;
            padding-left: 3px;
          }
          input:focus {
            outline-width: 0;
          }
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
             margin: 0;
          }
        `}
      </style>
    </div>
  )
}
