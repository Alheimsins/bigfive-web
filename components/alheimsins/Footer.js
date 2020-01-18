import Link from './Link'
import Logo from './Logo'

const links = [
  {
    url: 'https://alheimsins.net',
    name: 'alheimsins',
    icon: Logo({ color: 'white' }),
    color: 'white'
  },
  {
    url: 'https://github.com/alheimsins',
    name: 'github'
  },
  {
    url: '/about',
    name: 'about',
    target: '_self'
  }
]

export default () => (
  <footer>
    <div>
      {
        links.map(link =>
          !link.target
            ? <a key={link.name} href={link.url} target='_blank' style={{ color: link.color }} rel='noopener noreferrer'>{link.icon}{link.name}</a>
            : <Link key={link.name} route={link.url}><a>{link.icon}{link.name}</a></Link>
        )
      }
    </div>
    <style jsx>
      {`
        a {
          display: inline-block;
          text-transform: uppercase;
          position: relative;
          text-decoration: none;
          color: #666;
          margin: 0;
          transition: all 200ms;
          margin-left: 20px;
          font-size: 12px;
        }
        a:after {
          content: '';
          height: 1px;
          background: white;
          position: absolute;
          pointer-events: none;
          bottom: -5px;
          left: 0;
          right: 0;
          opacity: 0;
          transform: scale(0, 1);
          transition: all 200ms;
        }
        a:hover:after {
          opacity: 1;
          transform: scale(1, 1);
        }
        a:hover {
          color: white;
        }
        footer {
          grid-area: footer;
          background: black;
          color: #666;
          font-size: 12px;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}
    </style>
  </footer>
)
