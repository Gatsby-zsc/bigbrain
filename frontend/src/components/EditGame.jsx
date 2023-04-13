import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGET, fetchPut } from './library/fetch.js';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DoneIcon from '@mui/icons-material/Done';
import { WindowBorder } from './commonComponents';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import question from './library/question.js';
import { fileToDataUrl } from './library/helpers.js';
import { failNotify, successsNotify } from './library/notify.js';

const QuestionBorder = styled(WindowBorder)({
  padding: '10px',
  marginBottom: '10px',
});

function GamePanel () {
  let questionNumber = 1;

  const navigate = useNavigate();

  const location = useParams();
  const [quiz, setQuiz] = useState({});
  const [newGame, setNewGame] = useState(quiz.name);
  const [newThumbnail, setThumbnail] = useState(quiz.thumbnail);
  const [newQuestions, setQuestions] = useState(quiz.questions);
  const [refresh, setRefresh] = useState(true);

  // fetch quiz from server
  useEffect(async () => {
    const ret = await fetchGET('admin/quiz/' + location.quizId);
    setNewGame(ret.name);
    setThumbnail(ret.thumbnail);
    setQuestions(ret.questions);
    setQuiz(ret);
  }, []);

  // update question after we fetch data from server or edit quiz
  useEffect(() => {
    const newQuiz = {
      name: newGame,
      thumbnail: newThumbnail,
      questions: newQuestions,
      owner: quiz.owner,
      active: quiz.active,
      oldSessions: quiz.oldSessions,
      createdAt: quiz.createdAt
    }
    setQuiz(newQuiz);
  }, [refresh, newGame, newThumbnail])

  function moreQuestion () {
    // deep copy object to get an new question
    const newQestion = { ...question };
    newQuestions.push(newQestion);
    newQuestions[newQuestions.length - 1].questionId = Math.trunc((Date.now() * Math.random())) % 100000;
    setQuestions(newQuestions);
    setRefresh(!refresh);
  }

  async function updateQuiz () {
    const res = await fetchPut('admin/quiz/' + location.quizId, quiz);
    if (res.status === 200) {
      successsNotify('update quiz successully');
    } else {
      failNotify('update quiz failed!!!');
    }
  }

  // we need to update current questions before edit
  async function navigateToQuestion () {
    await fetchPut('admin/quiz/' + location.quizId, quiz);
  }

  return (
    <WindowBorder >
      <Container maxWidth={'sm'}>
        <Box sx={ { mt: 0, mb: 2 } }>
          <Typography
            variant='subtitle2'
            sx={ { mt: 2, mb: 1 } }
            style={ { textAlign: 'start' } }
          >
            Enter your new game title
          </Typography>
          <TextField
            autoFocus
            variant='outlined'
            value={newGame || ''}
            onChange={ (e) => { setNewGame(e.target.value) } }
            fullWidth
          />
          <Box>
            <Grid container spacing={1} sx={ { mb: 2 } }>
              <Grid item xs={6}>
                <Typography
                  variant='subtitle2'
                  sx={ { mt: 2, mb: 1 } }
                >
                  Upload an new thunmbnail
                </Typography>
                <Button variant='contained' component='label'>
                  { newThumbnail === null ? <PhotoCamera sx={ { mr: 1 } } /> : <DoneIcon sx={ { mr: 1 } } /> }
                    Upload
                  <input hidden type='file' onChange={ (e) => {
                    if (e.target.value !== null) {
                      fileToDataUrl(e.target.files[0]).then((data) => {
                        setThumbnail(data);
                      });
                    }
                  } } />
                </Button>
              </Grid>
              <Grid item xs={6}>
              <Typography
                  variant='subtitle2'
                  sx={ { mt: 2, mb: 1 } }
                >
                  Add more question
                </Typography>
                <Button variant="contained" sx={ { mr: 2 } } onClick={moreQuestion}>
                  <QuestionAnswerIcon sx={ { mr: 1 } }/>
                    More
                </Button>
              </Grid>
            </Grid>
          </Box>
          {newQuestions && newQuestions.map((eachQuestion) => {
            return <QuestionBorder key={eachQuestion.questionId}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography
                    variant='h6'
                  >
                    Question {questionNumber++}
                  </Typography>
                  <Typography
                    variant='subtitle2'
                  >
                    Id {eachQuestion.questionId}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Button fullWidth variant='contained' onClick={ () => {
                    navigate('./' + eachQuestion.questionId);
                    navigateToQuestion();
                  } }>
                    Edit
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button fullWidth variant='contained' onClick={ () => {
                    const Questions = newQuestions.filter((Question) => {
                      return Question.questionId !== eachQuestion.questionId
                    });
                    setQuestions(Questions);
                    setRefresh(!refresh);
                  } }>
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </QuestionBorder>
          })}
          <Button variant='contained' fullWidth sx={ { mt: 1 } } onClick={updateQuiz}>
            Update my quiz !!!
          </Button>
        </Box>
      </Container>
    </WindowBorder>
  )
}

export default GamePanel;
