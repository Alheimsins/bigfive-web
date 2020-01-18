import { Component } from 'react'
import { FaFacebook, FaTwitter, FaGooglePlus, FaLink } from 'react-icons/fa'
import { CopyToClipboard } from 'react-copy-to-clipboard'

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
    return (
      <p className='share'>
        Share results  {' '}
        <CopyToClipboard text={url} onCopy={() => this.showCopied()}>
          <a title='Copy to clipboard' style={{ cursor: 'pointer' }}>
            {this.state.copied && <i className='copy-text'>Link copied</i>}
            <FaLink />
          </a>
        </CopyToClipboard>{' '}
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} title='Share on facebook'>
          <FaFacebook />
        </a>
        <a href={`https://twitter.com/home?status=${url}`} title='Share on twitter'>
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

              .copy-text {
                background-color: #bd10e0;
                color: white;
                position: absolute;
                border-radius: 5px;
              }

              .share-text {
                font-size: 1.1rem;
                margin-right: 10px;
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
    )
  }
}
