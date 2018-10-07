import { Link } from '../../routes'
import { FaLink } from 'react-icons/fa'

export default ({ name }) => (
  <h1>
    <Link route={'#' + name.toLowerCase()}>
      <a id={name.toLowerCase()}>{name}<i className='shortcut'> <FaLink size={10} /></i></a>
    </Link>
    <style jsx>
      {`
        h1 a {
          color: unset;
          text-transform: capitalize;
        }
        h1 a:hover {
          color: black;
        }
        .shortcut {
          visibility: hidden;
          color: #909090;
        }
        h1 a:hover .shortcut {
          visibility: visible;
        }
      `}
    </style>
  </h1>
)
