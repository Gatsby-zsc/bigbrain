import React from 'react';
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';

function DashBoardButton () {
  const navigate = useNavigate();

  function goToDashboard () {
    navigate('/homepage/dashboard');
  }

  return (
    <Button name='dashboard-btn' variant='contained' sx={{ mr: 2 }} onClick={goToDashboard}>
      <DashboardIcon sx={{ mr: 1 }} />
      Dashboard
    </Button>
  );
}

export default DashBoardButton;
