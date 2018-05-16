import { FaFacebook, FaTwitter, FaGooglePlus } from 'react-icons/lib/fa'

export default ({ url }) => (
  <p className='share'>
        Share on{' '}
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
