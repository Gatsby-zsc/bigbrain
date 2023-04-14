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

const SideBarWindow = styled(WindowBorder)({
  padding: '10px'
})

function HistoryPanel () {
  const quizId = useParams().quizId;

  const [questions, setQuestions] = useState([]);
  const [name, setName] = useState('');
  const [thumbnail, setThumbnail] = useState(null)
  const [sessions, setSessions] = useState([])
  const [createdAt, setCreate] = useState(0)

  useEffect(async () => {
    const ret = await fetchGET('admin/quiz/' + quizId, 'token')
    setSessions(ret.oldSessions)
    setCreate(analyzeTime(ret.createdAt))
    setThumbnail(ret.thumbnail)
    setName(ret.name)
    setQuestions(ret.questions)
  }, [])

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={5} lg={4}>
        <SideBarWindow>
          <Box component='img' alt='quiz thumbnail' src={thumbnail === null ? sampleImg : thumbnail} />
          <Typography textAlign={'start'} variant='h4' sx={ { pl: 2, mt: 2, mb: 1 } }>
            {name}
          </Typography>
          <Typography textAlign={'start'} variant='subtitle1' sx={ { pl: 2 } }>
            {sessions.length} {sessions.length === 0 ? 'play' : 'plays'}
          </Typography>
          <Typography textAlign={'start'} variant='subtitle1' sx={ { pl: 2 } }>
            {questions.length} {questions.length === 0 ? 'question' : 'questions'}
          </Typography>
          <Typography textAlign={'start'} variant='subtitle1' sx={ { pl: 2 } }>
            {createdAt}
          </Typography>
        </SideBarWindow>
      </Grid>
      <Grid item xs={12} sm={6} md={7} lg={8}>
        {sessions.map(session => {
          return (
            <Box key={session} sx={ { mb: 2 } }>
              <WindowBorder>
                History game
                {session}
              </WindowBorder>
            </Box>
          )
        })}

      </Grid>
    </Grid>
  )
}

export default HistoryPanel;
