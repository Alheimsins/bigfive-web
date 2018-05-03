export default ({ color }) => (
  <div className='logo-container'>
    <svg className='logo' viewBox='0 0 310 200'>
      <path id='svg_3' d='m189.652989,153.487896l-7.0313,12.0937l-79.5937,-45.8437l0,91.8281l-14.0625,0l0,-91.8281l-79.5938,45.8437l-7.0312,-12.0937l79.5938,-45.9844l-79.5938,-45.9844l7.0312,-12.0937l79.5938,45.8437l0,-91.8281l14.0625,0l0,91.8281l79.5937,-45.8437l7.0313,12.0937l-79.5937,45.9844l79.5937,45.9844z' />
    </svg>
    <style jsx>
      {`
        .logo-container {
          display: inline-block;
          vertical-align: middle;
        }
        .logo {
          width: 25px;
          fill: ${color || 'black'};
        }
    `}
    </style>
  </div>
)
