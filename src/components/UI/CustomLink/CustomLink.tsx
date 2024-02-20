import React from 'react'
import { Link, LinkProps } from 'react-router-dom'

const CustomLink: React.FC<LinkProps> = ({ children, to }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      {children}
    </Link>
  )
}

export default CustomLink
