export default ({ children }) => (
  <span className='code'>
    {children}
    <style jsx>
      {`
        color: #bd10e0;
        font-family: Menlo,Monaco,Lucida Console,Liberation Mono, DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace, serif;
        font-size: 0.9em;
      `}
    </style>
  </span>
)
