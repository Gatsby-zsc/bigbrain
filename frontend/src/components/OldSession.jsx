import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Collapse from '@mui/material/Collapse';
import { WindowBorder } from './commonComponents';
import { styled } from '@mui/system'
import SessionResult from './SessionResults';

const OldSessionWindow = styled(WindowBorder)({
  paddingTop: '20px'
})

function Session (props) {
  const [expanded, setExpanded] = useState(false);
  const session = props.value;

  // get results of current session

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
        <SessionResult value={session} />
      </Collapse>
    </OldSessionWindow>
  );
}

export default Session;
