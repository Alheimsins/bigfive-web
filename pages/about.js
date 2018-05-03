import { Fragment } from 'react'
const users = [
  {
    avatar: '/static/maccyber.png',
    name: 'Jonas Maccyber Enge',
    nick: {
      name: 'maccyber',
      link: 'https://github.com/maccyber'
    },
    description: 'generally a nice guy',
    dev: true
  },
  {
    avatar: 'http://www.interactiveparty.com/sites/interactiveparty.com/files/default_images/testmonial%20default.png',
    name: 'Geir Gåsodden',
    nick: {
      name: 'zrrrzzt',
      link: 'https://github.com/zrrrzzt/'
    },
    description: 'generally a nice guy',
    dev: true
  },
  {
    avatar: 'http://www.interactiveparty.com/sites/interactiveparty.com/files/default_images/testmonial%20default.png',
    name: 'Eli Marianne Huseby',
    nick: {
      name: 'elimg',
      link: 'http://blekksprutene.no/'
    },
    description: 'generally a nice woman'
  },
  {
    avatar: 'http://www.interactiveparty.com/sites/interactiveparty.com/files/default_images/testmonial%20default.png',
    name: 'Eduardo Calle',
    nick: {
      name: 'nieled',
      link: 'https://riseup.net/'
    },
    description: 'generally a nice guy'
  }
]

const Users = ({ users }) => (
  <div className='about'>
    { users.map(user => (
      <div key={user.nick.name} className='info'>
        <div>
          <span className='avatar'>
            <img width='80' height='80' src={user.avatar} />
          </span>
        </div>
        <div className='text'>
          <div className='name'>
            {user.name}
          </div>
          <div className='nick'>
            <a href={user.nick.link}>@{user.nick.name}</a>
          </div>
          <div className='description'>
            <i>{user.description}</i>
          </div>
        </div>
      </div>
    ))}
    <style jsx>
      {`
        .about {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .info {
          display: flex;
          flex-direction: row;
          padding: 10px 0px;
          align-items: center;
          justify-content: center;
        }
        .text {
          text-align: left;
          padding-left: 20px;
        }
        .avatar {
          border-radius: 100%;
          display: inline-block;
          overflow: hidden;
          border: 1px solid #eee;
          line-height: 0;
          vertical-align: top;
        }
        .nick a {
          color: #ff0080
        }
        .name {
          display: inline-block;
          font-size: 18px;
          font-weight: 700;
        }
      `}
    </style>
  </div>
)

export default () => {
  const dev = users.filter(user => user.dev)
  const trans = users.filter(user => !user.dev)
  return (
    <Fragment>
      <h2>Developers</h2>
      <Users users={dev} />
      <h2>Translators</h2>
      <Users users={trans} />
    </Fragment>
  )
}
