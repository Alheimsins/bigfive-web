import { FaFacebook, FaTwitter, FaGooglePlus, FaLink } from 'react-icons/fa'
import { CopyToClipboard } from 'react-copy-to-clipboard'

// TODO: Notification when clicked copy text link
export default ({ url }) => (
  <p className='share'>
        Share on{' '}
    <CopyToClipboard text={url}><a title='Copy to clipboard' style={{ cursor: 'pointer' }}><FaLink /></a></CopyToClipboard>{' '}
    <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} title='Share on facebook'><FaFacebook /></a>{' '}
    <a href={`https://twitter.com/home?status=${url}`} title='Share on twitter'><FaTwitter />{' '}</a>
    <a href={`https://plus.google.com/share?url=${url}`} title='Share on google plus'><FaGooglePlus /></a>
    <style jsx>
      {`
        .share {
          text-align: right;
        }
        .share a {
          color: black;
        }
      `}
    </style>
  </p>
)
