import Link from './Link'

export default ({ user, info }) => (
  <header>
    <div className='nav-container'>
      <div className='links-container'>
        <Link route='/' activeClassName='active'><a>HOME</a></Link>
        <Link route='/test' activeClassName='active'><a>TEST</a></Link>
        <Link route='/result' activeClassName='active'><a>RESULT</a></Link>
        <Link route='/compare' activeClassName='active'><a>COMPARE</a></Link>
        <Link route='/about' activeClassName='active'><a>ABOUT</a></Link>
      </div>
      <div className='nav-right'>
        {user
          ? <span>logged in as <b>{user}</b></span>
          : <a href='/api/login' style={{ color: 'black' }}>LOGIN</a>}
      </div>
      {info && <div className='nav-info'>{info}</div>}
    </div>
    <style jsx>
      {`
        header {
          grid-area: header;
          justify-self: center;
          background: white;
          margin: auto;
          padding: 25px;
          max-width: 900px;
        }
        .nav-info {
          position: absolute;
          font-size: 12px;
          left: 10%;
        }
        .links-container, .nav-container {
          display: inline-block;
        }
        .nav-right {
          right: 20px;
          position: absolute;
          display: inline-block;
          font-size: 12px;
        }
        a {
          color: #999;
          padding: 10px;
          font-size: 12px;
        }
        a:hover {
          color: black;
        }
        .active {
          color: black !important;
        }
        @media screen and (max-width: 800px) {
          .nav-right {
            display: none;
          }
        }
      `}
    </style>
  </header>
)
