import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

function HomepageButton () {
  const navigate = useNavigate()

  function goToHomePage () {
    navigate('/homepage')
  }

  return (
    <>
      <Button variant='contained' onClick={goToHomePage} sx={ { mr: 2 } } >
        <HomeIcon sx={ { mr: 1 } }/>
          Home
      </Button>
    </>
  )
}

export default HomepageButton
