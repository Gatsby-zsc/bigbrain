import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGET, fetchPut } from '../library/fetch.js';
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
import question from '../library/question.js';
import { fileToDataUrl } from '../library/helpers.js';
import { failNotify, successsNotify } from '../library/notify.js';
import sampleImg from '../pictures/sample.jpg';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

const ContainerBorder = styled(WindowBorder)({
  maxHeight: '85vh',
  overflow: 'auto',
});

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
    const ret = await fetchGET('admin/quiz/' + location.quizId, 'token');
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
      createdAt: quiz.createdAt,
    };
    setQuiz(newQuiz);
  }, [refresh, newGame, newThumbnail]);

  // deep copy object to get an new question
  function moreQuestion () {
    const newQestion = { ...question };
    newQuestions.push(newQestion);
    newQuestions[newQuestions.length - 1].questionId =
      Math.trunc(Date.now() * Math.random()) % 100000;
    setQuestions(newQuestions);
    setRefresh(!refresh);
  }

  // update quiz after we edit content
  async function updateQuiz () {
    const res = await fetchPut('admin/quiz/' + location.quizId, quiz, 'token');
    if (res.status === 200) {
      successsNotify('update quiz successully');
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } else {
      failNotify('update quiz failed!!!');
    }
  }

  // we need to update current questions status
  // before edit each question details
  async function navigateToQuestion () {
    await fetchPut('admin/quiz/' + location.quizId, quiz, 'token');
  }

  return (
    <ContainerBorder>
      <Container maxWidth={'sm'}>
        <Box sx={{ mt: 0, mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ mt: 2, mb: 1 }}
            style={{ textAlign: 'start' }}
          >
            Enter your new game title
          </Typography>
          <TextField
            autoFocus
            variant="outlined"
            value={newGame || ''}
            onChange={(e) => {
              setNewGame(e.target.value);
            }}
            fullWidth
          />
          <Box>
            <Grid container spacing={1} sx={{ mb: 2 }}>
              <Grid item container md={4} spacing={3}>
                <Grid item xs={6} md={12}>
                  <Typography
                    textAlign="center"
                    variant="subtitle2"
                    sx={{ mt: 2, mb: 1 }}
                  >
                    Upload thunmbnail
                  </Typography>
                  <Button
                    fullWidth
                    name="thumbnail"
                    variant="contained"
                    component="label"
                  >
                    {newThumbnail === null
                      ? (
                      <PhotoCamera sx={{ mr: 1 }} />
                        )
                      : (
                      <DoneIcon sx={{ mr: 1 }} />
                        )}
                    Upload
                    <input
                      hidden
                      type="file"
                      onChange={(e) => {
                        if (e.target.value !== null) {
                          fileToDataUrl(e.target.files[0]).then((data) => {
                            setThumbnail(data);
                          });
                          e.target.value = null;
                        }
                      }}
                    />
                  </Button>
                </Grid>
                <Grid item xs={6} md={12}>
                  <Typography
                    textAlign="center"
                    variant="subtitle2"
                    sx={{ mt: 2, mb: 1 }}
                  >
                    Add more question
                  </Typography>
                  <Button
                    name="more-question"
                    fullWidth
                    variant="contained"
                    sx={{ mr: 2 }}
                    onClick={moreQuestion}
                  >
                    <QuestionAnswerIcon sx={{ mr: 1 }} />
                    More
                  </Button>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                md={8}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Box
                  component="img"
                  alt="thumbnail"
                  src={newThumbnail === null ? sampleImg : newThumbnail}
                  sx={{ pl: 2, pr: 2, mt: 3, width: '400px', height: '200px' }}
                />
              </Grid>
            </Grid>
          </Box>
          {newQuestions &&
            newQuestions.map((eachQuestion) => {
              return (
                <QuestionBorder key={eachQuestion.questionId}>
                  <Grid container>
                    <Grid
                      item
                      xs={7}
                      sm={6}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="h6" textAlign="center">
                        Question {questionNumber++}
                      </Typography>
                      <Typography variant="subtitle2" textAlign="center">
                        Id {eachQuestion.questionId}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={5}
                      sm={6}
                      spacing={1}
                      sx={{
                        marginTop: '2px',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Grid item xs={12} sm={6}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => {
                            navigate('./' + eachQuestion.questionId);
                            navigateToQuestion();
                          }}
                        >
                          <EditNoteIcon sx={{ mr: 1 }} />
                          Edit
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => {
                            const Questions = newQuestions.filter(
                              (Question) => {
                                return (
                                  Question.questionId !==
                                  eachQuestion.questionId
                                );
                              }
                            );
                            setQuestions(Questions);
                            setRefresh(!refresh);
                          }}
                        >
                          <DeleteIcon sx={{ mr: 1 }} />
                          Delete
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </QuestionBorder>
              );
            })}
          <Button
            name="update"
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
            onClick={updateQuiz}
          >
            Update my quiz
          </Button>
        </Box>
      </Container>
    </ContainerBorder>
  );
}

export default GamePanel;
