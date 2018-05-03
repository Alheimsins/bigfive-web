export default (props) => {
  const propTypes = {
    onClick: props.onClick,
    disabled: props.disabled,
    value: props.value,
    type: props.type || 'button',
    name: props.name,
    autoFocus: props.autoFocus
  }

  return (
    <p>
      <input {...propTypes} />
      <style jsx>
        {`
          input {
            width: ${props.width || '200px'};
            height: ${props.height || '50px'};
            border: ${props.border || '1px solid black'};
            font-size: ${props.fontSize || '12px'};
            text-transform: uppercase;
            transition: all 200ms;
            color: ${props.color || 'white'};
            background: ${props.background || 'black'};
            border-radius: 5px;
            cursor: pointer;
          }
          input:disabled {
            background: #eaeaea;
            color: #cccccc;
            border-color: white;
          }
        `}
      </style>
    </p>
  )
}
