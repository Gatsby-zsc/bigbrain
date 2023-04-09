import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { WindowBorder } from './commonComponents';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { Grid } from '@mui/material';
import Option from './Option';

const NewWindowBorder = styled(WindowBorder)({
  padding: '10px',
  marginBottom: '20px',
  position: 'relative'
});

function Question (props) {
  const question = props.value;
  const qid = question.questionId;
  const [questionType, setQuestionType] = useState(question.questionType);
  const [questionField, setQuestionField] = useState(question.questionField);
  const [points, setPoints] = useState(question.points);
  const [timeLimit, setTimeLimit] = useState(question.timeLimit);
  const [videoURL, setVideoURL] = useState(question.videoURL);
  const [imgURL, setImgURL] = useState(question.imgURL);
  const [options] = useState(question.answers);

  // allow user to view more info for the created new game
  const [expanded, setExpanded] = useState(false);
  function viewDetails () {
    setExpanded(!expanded);
  }

  return (
    <NewWindowBorder>
        <Typography
          variant='subtitle1'
        >
          Question id: {qid}
        </Typography>
        <IconButton
          aria-label="expand"
          sx={ { position: 'absolute', right: 10, top: 3 } }
          onClick={viewDetails}
        >
          <ExpandMoreIcon />
        </IconButton>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={ { mt: 0, mb: 2 } }>
            <Typography
              variant='subtitle2'
              sx={ { mt: 1, mb: 1 } }
            >
              Question title
            </Typography>
            <TextField
              variant='outlined'
              value={questionField}
              onChange={(e) => { setQuestionField(e.target.value) } }
              fullWidth
            />
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography
                  variant='subtitle2'
                  sx={ { mt: 1, mb: 1 } }
                >
                  Question type
                </Typography>
                <Select
                  value={questionType}
                  onChange={(e) => { setQuestionType(e.target.value) } }
                  fullWidth
                >
                  <MenuItem value='type'>None</MenuItem>
                  <MenuItem value='single'>single</MenuItem>
                  <MenuItem value='multiple'>multiple</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant='subtitle2'
                  sx={ { mt: 1, mb: 1 } }
                >
                  Question points
                </Typography>
                <Select
                  value={points}
                  onChange={(e) => { setPoints(e.target.value) } }
                  fullWidth
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant='subtitle2'
                  sx={ { mt: 1, mb: 1 } }
                >
                  Question timeLimit
                </Typography>
                <Select
                  value={timeLimit}
                  onChange={(e) => { setTimeLimit(e.target.value) } }
                  fullWidth
                >
                  <MenuItem value={0}>0s</MenuItem>
                  <MenuItem value={5}>5s</MenuItem>
                  <MenuItem value={10}>10s</MenuItem>
                  <MenuItem value={15}>15s</MenuItem>
                  <MenuItem value={30}>30s</MenuItem>
                  <MenuItem value={60}>1min</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Typography
              variant='subtitle2'
              sx={ { mt: 1, mb: 1 } }
            >
              Question videoURL (optional)
            </Typography>
            <TextField
              value={videoURL}
              variant='outlined'
              onChange={(e) => { setVideoURL(e.target.value) } }
              fullWidth
            />
            <Typography
              variant='subtitle2'
              sx={ { mt: 1, mb: 1 } }
            >
              Question imgURL (optional)
            </Typography>
            <TextField
              value={imgURL}
              variant='outlined'
              onChange={(e) => { setImgURL(e.target.value) } }
              fullWidth
            />
            <Grid container spacing={1}>
              {options.map(option => {
                return (
                  <Grid
                    item
                    xs={6}
                    key={option.optionId}
                  >
                      <Option value={option}/>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        </Collapse>
    </NewWindowBorder>
  )
}

export default Question;
