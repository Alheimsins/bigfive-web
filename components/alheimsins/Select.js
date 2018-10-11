import React from 'react'

export default function Select (props) {
  const propTypes = {
    name: props.name,
    id: props.name,
    defaultValue: props.defaultValue
  }

  return (
    <div>
      <select name='country' aria-label={props.name} {...propTypes}>
        {props.options.map(option =>
          <option key={option.code} value={option.code}>{option.name}</option>
        )}
      </select>
      <style jsx>
        {`
          select {
            border-width: 0;
            background: none;
            outline-width: 0;
            width: 100%;
          }
        `}
      </style>
    </div>
  )
}
