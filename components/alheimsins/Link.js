import { withRouter } from 'next/router'
import { Link } from '../../routes'
import React, { Children } from 'react'

const ActiveLink = ({ router, children, ...props }) => {
  const child = Children.only(children)

  let className = child.props.className || null
  const route = props.route.toLowerCase().substring(1)
  const pathname = router.pathname.toLowerCase()
  if (router.pathname === props.route || (route.length > 1 && pathname.includes(route) && props.activeClassName)) {
    className = `${className !== null ? className : ''} ${props.activeClassName}`.trim()
  }

  delete props.activeClassName

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>
}

export default withRouter(ActiveLink)
