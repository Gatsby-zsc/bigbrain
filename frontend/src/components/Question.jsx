import React, { useState, useEffect } from 'react';
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
  const setQuestion = props.function;
  const questions = props.questions;

  const qid = question.questionId;

  const [newType, setType] = useState(question.questionType);
  const [newField, setField] = useState(question.questionField);
  const [newPoints, setPoints] = useState(question.points);
  const [newLimit, setTimeLimit] = useState(question.timeLimit);
  const [newVideoURL, setVideoURL] = useState(question.videoURL);
  const [newImgURL, setImgURL] = useState(question.imgURL);
  const [newOptions, setOptions] = useState(question.answers);

  // allow user to view more info for the created new game
  const [expanded, setExpanded] = useState(false);

  function viewDetails () {
    setExpanded(!expanded);
  }

  useEffect(() => {
    const newQuestions = questions.map((question) => {
      if (question.questionId === qid) {
        return ({
          questionField: newField,
          questionType: newType,
          questionId: qid,
          timeLimit: newLimit,
          points: newPoints,
          videoURL: newVideoURL,
          imgURL: newImgURL,
          answers: newOptions
        })
      } else {
        return question;
      }
    })

    setQuestion(newQuestions);
  }, [newType,
    newField,
    newPoints,
    newLimit,
    newVideoURL,
    newImgURL,
    newOptions])

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
              value={newField}
              onChange={(e) => { setField(e.target.value) } }
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
                  value={newType}
                  onChange={(e) => { setType(e.target.value) } }
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
                  value={newPoints}
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
                  value={newLimit}
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
              value={newVideoURL}
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
              value={newImgURL}
              variant='outlined'
              onChange={(e) => { setImgURL(e.target.value) } }
              fullWidth
            />
            <Grid container spacing={1}>
              {newOptions.map(option => {
                return (
                  <Grid
                    item
                    xs={6}
                    key={option.optionId}
                  >
                    <Option
                      value={option}
                      question={question}
                      questions={questions}
                      questionFunction={setQuestion}
                      options={newOptions}
                      optionFunction={setOptions}
                    />
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
