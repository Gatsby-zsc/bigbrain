import React from 'react';
import { fetchPOST } from '../../library/fetch.js';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function Logout () {
  const navigate = useNavigate();

  function logout () {
    fetchPOST('admin/auth/logout', {}, 'logout');
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <>
      <Button variant='contained' onClick={logout}>
        <LogoutIcon sx={{ mr: 1 }} />
        Logout
      </Button>
    </>
  );
}

export default Logout;
