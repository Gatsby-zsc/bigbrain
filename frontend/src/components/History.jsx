import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { WindowBorder } from './commonComponents';
import { useParams } from 'react-router-dom';
import { fetchGET } from '../library/fetch';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import sampleImg from '../pictures/sample.jpg'
import analyzeTime from '../library/time';
import { styled } from '@mui/system'
import Session from './OldSession';
import SubtitlesIcon from '@mui/icons-material/Subtitles';

const SideBarWindow = styled(WindowBorder)({
  padding: '10px'
})

function processTime (time) {
  let retTime = time
  retTime /= 1000

  let minutes = 0
  while (retTime >= 60) {
    retTime -= 60
    minutes++
  }

  const totalTime = minutes.toString() + 'm' + retTime.toString() + 's'
  return totalTime
}

function HistoryPanel () {
  const quizId = useParams().quizId;

  const [questions, setQuestions] = useState([]);
  const [name, setName] = useState('');
  const [thumbnail, setThumbnail] = useState(null)
  const [sessions, setSessions] = useState([])
  const [createdAt, setCreate] = useState(0)
  const [totalTime, setTotalTime] = useState(0)

  // fetch session info then reset all value
  useEffect(async () => {
    const ret = await fetchGET('admin/quiz/' + quizId, 'token')
    setSessions(ret.oldSessions)
    setCreate(analyzeTime(ret.createdAt))
    setThumbnail(ret.thumbnail)
    setName(ret.name)
    setQuestions(ret.questions)
  }, [])

  // count total time
  useEffect(() => {
    let newTime = 0
    for (const eachQuestion of questions) {
      newTime += eachQuestion.timeLimit
    }

    newTime = processTime(newTime)

    setTotalTime(newTime)
  }, [questions])

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={5} lg={4} sx={ { mb: 1 } }>
        <SideBarWindow>
          <Box component='img' alt='quiz thumbnail' src={thumbnail === null ? sampleImg : thumbnail} />
          <Typography textAlign={'start'} variant='h4' sx={ { pl: 2, mt: 2, mb: 1 } }>
            <SubtitlesIcon sx={ { mr: 1 } }/>{name}
          </Typography>
          <Typography textAlign={'start'} variant='subtitle1' sx={ { pl: 2 } }>
            Posted {createdAt}
          </Typography>
          <Typography textAlign={'start'} variant='subtitle1' sx={ { pl: 2 } }>
            {questions.length} {questions.length === 0 ? 'question' : 'questions'} in {totalTime}
          </Typography>
          <Typography textAlign={'start'} variant='subtitle1' sx={ { pl: 2 } }>
            {sessions.length} {sessions.length === 0 ? 'play' : 'plays'}
          </Typography>
        </SideBarWindow>
      </Grid>
      <Grid item xs={12} sm={6} md={7} lg={8}>
        {sessions.map(session => {
          return (
            <Box key={session} sx={{ mb: 2, position: 'relative' }}>
              <Session value={session}></Session>
            </Box>
          )
        })}
      </Grid>
    </Grid>
  )
}

export default HistoryPanel;
