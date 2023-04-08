import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const LinkInButton = styled(Link)({
  textDecoration: 'none',
  color: 'white',
  display: 'block',
  paddingLeft: '4px'
});

function CustomizedLink (props) {
  return (
    <LinkInButton {...props}>
      {props.children}
    </LinkInButton>
  )
}

export {
  CustomizedLink
}
