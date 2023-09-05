import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { WindowBorder } from './commonComponents';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGET } from '../library/fetch';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import sampleImg from '../pictures/sample.jpg';
import analyzeTime from '../library/parseTime';
import { styled } from '@mui/system';
import Session from './OldSession';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import processTime from '../library/questionTotalTime';
import Button from '@mui/material/Button';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { TextField } from '@mui/material';

const SideBarWindow = styled(WindowBorder)({
  padding: '10px',
  marginBottom: '10px'
});

function HistoryPanel () {
  const navigate = useNavigate();
  const quizId = useParams().quizId;

  const [questions, setQuestions] = useState([]);
  const [name, setName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [createdAt, setCreate] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [search, setSearch] = useState('');
  const [numberSession, setNumberSession] = useState(0);

  // fetch session info then reset all value
  useEffect(async () => {
    const ret = await fetchGET('admin/quiz/' + quizId, 'token');
    setSessions(ret.oldSessions);
    setCreate(analyzeTime(ret.createdAt));
    setThumbnail(ret.thumbnail);
    setName(ret.name);
    setQuestions(ret.questions);
    setNumberSession(ret.oldSessions.length);
  }, []);

  // count total time
  useEffect(() => {
    let newTime = 0;
    for (const eachQuestion of questions) {
      newTime += eachQuestion.timeLimit;
    }

    newTime = processTime(newTime);

    setTotalTime(newTime);
  }, [questions]);

  // filter sessions
  useEffect(async () => {
    const fetchSessions = (await fetchGET('admin/quiz/' + quizId, 'token')).oldSessions;
    const newSessions = fetchSessions.filter((session) => {
      const stringSession = session.toString();
      if (stringSession.includes(search)) {
        return true;
      }
      return false;
    })

    setSessions(newSessions);
  }, [search]);

  function goToEdit () {
    navigate(`/homepage/dashboard/${quizId}`);
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={5} lg={4} sx={{ mb: 1 }}>
        <SideBarWindow>
          <Box
            component='img'
            alt='quiz thumbnail'
            src={thumbnail === null ? sampleImg : thumbnail}
          />
          <Typography
            name='game title'
            textAlign={'start'}
            variant='h5'
            sx={{ pl: 2, mt: 2, mb: 1, display: 'inline' }}
          >
            <SubtitlesIcon sx={{ mr: 1 }} />
            {name}
          </Typography>
          <Typography textAlign={'start'} variant='subtitle1' sx={{ pl: 2 }}>
            Posted {createdAt}
          </Typography>
          <Typography textAlign={'start'} variant='subtitle1' sx={{ pl: 2 }}>
            {questions.length}{' '}
            {questions.length === 0 ? 'question' : 'questions'} in {totalTime}
          </Typography>
          <Typography textAlign={'start'} variant='subtitle1' sx={{ pl: 2, pb: 2 }}>
            {numberSession} {numberSession === 0 ? 'play' : 'plays'}
          </Typography>
          <Button name='edit' variant='contained' onClick={goToEdit}>
            <EditNoteIcon sx={ { mr: 1 } }/>
            Edit
          </Button>
        </SideBarWindow>
      </Grid>
      <Grid item xs={12} sm={6} md={7} lg={8}>
        <SideBarWindow>
          <TextField
          variant='outlined'
          label='Search Session'
          onChange={(e) => { setSearch(e.target.value) }}
        >
          {search}
        </TextField>
        </SideBarWindow>
        {sessions.map((session) => {
          return (
            <Box key={session} sx={{ mb: 2, position: 'relative' }}>
              <Session value={session}></Session>
            </Box>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default HistoryPanel;
