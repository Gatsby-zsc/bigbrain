import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGET } from './library/fetch.js';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import sampleImg from './sample.jpg'

const QuizWindowBorder = styled('div')({
  padding: '10px',
  borderRadius: '8px',
  boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
});

function GamePanel () {
  const location = useParams();
  const [quiz, setQuiz] = useState({});
  const [newGame, setNewGame] = useState('');

  useEffect(async () => {
    const ret = await fetchGET('admin/quiz/' + location.Id);
    setQuiz(ret);
  }, []);

  return (
    <Container maxWidth={'md'}>
      <QuizWindowBorder >
        {quiz.name}
        <Container maxWidth={'sm'}>
          <TextField
            autoFocus
            variant='outlined'
            label='New title'
            value={newGame}
            onChange={ (e) => { setNewGame(e.target.value) } }
            fullWidth
          />
          <Box
            component='img'
            alt='Game thumbnail'
            src={quiz.thumbnail ? quiz.thumbnail : sampleImg}
            sx={ {
              height: 300,
              width: '100%',
            } }
          >

          </Box>
        </Container>
        </QuizWindowBorder>
    </Container>
  )
}

export default GamePanel;
