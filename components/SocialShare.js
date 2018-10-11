import { Component } from 'react'
import { FaFacebook, FaTwitter, FaGooglePlus, FaLink } from 'react-icons/fa'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Transition, animated } from 'react-spring'

const Copied = styles => (
  <animated.i
    style={{
      backgroundColor: 'rgb(255, 0, 128)',
      padding: '2px 10px',
      color: 'white',
      position: 'absolute',
      borderRadius: '5px',
      ...styles
    }}
  >
    Link copied
  </animated.i>
)

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.showCopied = this.showCopied.bind(this)
  }

  showCopied () {
    this.setState({ copied: true })
    setTimeout(() => { this.setState({ copied: false }) }, 1000)
  }

  render () {
    const { url } = this.props
    return <p className='share'>
      <span className='share-text'>Share your results </span>
      <CopyToClipboard text={url} onCopy={() => this.showCopied()}>
        <a title='Copy to clipboard' style={{ cursor: 'pointer' }}>
          <Transition native from={{ opacity: 0, transform: 'translateX(10px)' }} enter={{ opacity: 1, transform: 'translateX(0)' }} leave={{ opacity: 0, transform: 'translateX(10px)' }}>
            {this.state.copied && Copied}
          </Transition>
          <FaLink />
        </a>
      </CopyToClipboard> <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} title='Share on facebook'>
        <FaFacebook />
      </a> <a href={`https://twitter.com/home?status=${url}`} title='Share on twitter'>
        <FaTwitter />{' '}
      </a>
      <a href={`https://plus.google.com/share?url=${url}`} title='Share on google plus'>
        <FaGooglePlus />
      </a>
      <style jsx>
        {`
            .share {
              text-align: right;
            }

            .share-text {
              font-size: 1.1rem;
              margin-right: 10px;
              transition: all 0.5s;
            }

            .share:hover .share-text {
              margin-right: 20px;
            }

            .share a {
              color: black;
            }
          `}
      </style>
    </p>
  }
}
