import React from 'react'
import { Link } from 'react-router-dom'
import { styled } from '@mui/system'

const LinkInButton = styled(Link)({
  textDecoration: 'none',
  color: 'white',
  display: 'block',
  paddingLeft: '4px'
})

function CustomizedLink (props) {
  return (
    <LinkInButton {...props}>
      {props.children}
    </LinkInButton>
  )
}

const WindowBorder = styled('div')({
  padding: '24px',
  borderRadius: '8px',
  boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column'
})

export {
  CustomizedLink,
  WindowBorder
}
