import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Collapse from '@mui/material/Collapse';
import { WindowBorder } from './commonComponents';
import { fetchGET } from '../library/fetch';
import { styled } from '@mui/system'

const OldSessionWindow = styled(WindowBorder)({
  paddingTop: '20px'
})

function Session (props) {
  const [expanded, setExpanded] = useState(false);
  const session = props.value;

  // get results of current session
  useEffect(async () => {
    const ret = await fetchGET('admin/session/' + session + '/results', 'token');
    console.log(ret);
    // process result
  }, [])

  function viewDetails () {
    setExpanded(!expanded);
  }

  return (
    <OldSessionWindow>
      <Typography variant="h5" textAlign={'start'}>
        Session id: {session}
      </Typography>
      <IconButton
        sx={{ position: 'absolute', right: 10, top: 15 }}
        onClick={viewDetails}
      >
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        More details of session
      </Collapse>
    </OldSessionWindow>
  );
}

export default Session;
