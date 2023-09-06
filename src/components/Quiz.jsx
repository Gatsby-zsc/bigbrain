import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import analyzeTime from '../library/parseTime.js';
import sampleImg from '../pictures/sample.jpg';
import { fetchGET, fetchDelete } from '../library/fetch.js';
import { useNavigate } from 'react-router-dom';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DialogActions from '@mui/material/DialogActions';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { failNotify, successsNotify } from '../library/notify.js';
import HistoryIcon from '@mui/icons-material/History';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import { startQuiz, stopQuiz } from '../library/control.js';
import Grid from '@mui/material/Grid';
import processTime from '../library/questionTotalTime';

function Quiz (props) {
  const refresh = props.value;
  const setRefresh = props.function;
  const eachQuiz = props.eachQuiz;

  const quizId = eachQuiz.id;
  const [questions, setQuestions] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [quizStatus, setQuizStatus] = useState(eachQuiz.active);
  const [urlCopy, setUrlCopy] = useState(false);
  const [viewResult, setViewResult] = useState(false);
  const [start, setStart] = useState(false);

  const navigate = useNavigate();

  const path = window.location.href.split('/').filter((path) => {
    return path !== '';
  });
  const currentLocation = path[1];

  // request server to get the details of each question for the corresponding quiz
  useEffect(() => {
    const fetchData = async () => {
      const ret = await fetchGET('admin/quiz/' + quizId, 'token');
      if (ret.active !== null) {
        localStorage.setItem(quizId, ret.active);
      }
      setQuizStatus(ret.active);
    };
    fetchData();
  }, [start, urlCopy, viewResult]);
  console.log(quizStatus);

  // request server to get the details of each question for the corresponding quiz
  useEffect(async () => {
    const ret = await fetchGET('admin/quiz/' + quizId, 'token');
    setQuestions(ret.questions);
  }, []);

  // reset new time after fetch info of all questions of quiz
  useEffect(() => {
    let newTime = 0;
    for (const eachQuestion of questions) {
      newTime += eachQuestion.timeLimit;
    }

    newTime = processTime(newTime);

    setTotalTime(newTime);
  }, [questions]);

  // show a popup for admin which allows them to copy an url for particular session
  const handleCopyOpen = () => {
    setUrlCopy(true);
  };

  // close popup after admin copy url
  const handleCopyClose = () => {
    setUrlCopy(false);
  };

  // show a popup for admin to view quiz result
  const handleViewResultOpen = () => {
    setViewResult(true);
  };

  // close a popup if admin don't want to view result
  const handleViewResultClose = () => {
    setViewResult(false);
  };

  // delete current quiz by sending request to server
  function deleteGame () {
    if (quizStatus !== null) {
      failNotify('You can not delete a running game!');
      return;
    }
    fetchDelete('admin/quiz/' + quizId);
    successsNotify('Delete game successfully');
    setRefresh(!refresh);
  }

  // navigate to new url to edit current quiz
  function editGame () {
    if (quizStatus !== null) {
      failNotify('You can not edit a running game!');
      return;
    }
    navigate('./' + quizId);
  }

  // navigate to history panel to view the past quiz results
  function goToHistory () {
    navigate('./history/' + quizId);
  }

  // navigate to another window to advance game process
  function controlGame () {
    if (quizStatus === null) {
      failNotify('Game not started yet!');
    } else {
      navigate(`/ongoing/${quizId}/${quizStatus}`);
    }
  }

  // start particular game and display a popup for admin to copy url
  async function startGame () {
    await startQuiz(quizId);
    handleCopyOpen();
    setStart(true);
  }

  // stop particular game and display a popup for admin to view result
  async function stopGame () {
    await stopQuiz(quizId);
    handleViewResultOpen();
    setStart(false);
  }

  // copy url for particular session to clipboard
  function copyUrlToClipboard () {
    navigator.clipboard.writeText(`${currentLocation}/play/${quizStatus}`);
    handleCopyClose();
  }

  // navigate to results panel after game is ended
  function showResults () {
    handleViewResultClose();
    const sessionId = localStorage.getItem(quizId);
    navigate(`/ongoing/${quizId}/${sessionId}`);
  }

  return (
    <>
      <Card sx={{ position: 'relative' }}>
        <IconButton
          name="delete"
          aria-label="delete"
          sx={{ position: 'absolute', right: 10, top: 10 }}
          onClick={deleteGame}
        >
          <DeleteIcon />
        </IconButton>
        <CardHeader
          title={Quiz.name}
          subheader={analyzeTime(Quiz.createdAt)}
          sx={{ textAlign: 'center' }}
        />
        <CardMedia
          component="img"
          height="250px"
          image={Quiz.thumbnail ? Quiz.thumbnail : sampleImg}
          alt="Thumbnail"
        />
        <CardContent>
          <Typography sx={{ mb: 1, textAlign: 'center' }} variant="body1">
            {questions.length} questions
          </Typography>
          <Typography sx={{ mb: 2, textAlign: 'center' }} variant="body2">
            Total time: {totalTime}
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={3} md={6} lg={3}>
              <Button
                name="edit-quiz-btn"
                variant="contained"
                onClick={editGame}
                fullWidth
              >
                <EditNoteIcon fontSize="medium" sx={{ mr: 1 }} /> Edit
              </Button>
            </Grid>
            <Grid item xs={6} sm={3} md={6} lg={3}>
              <Button
                name="history"
                variant="contained"
                onClick={goToHistory}
                fullWidth
              >
                <HistoryIcon fontSize="medium" sx={{ mr: 1 }} /> History
              </Button>
            </Grid>
            <Grid item xs={6} sm={3} md={6} lg={3}>
              {quizStatus === null
                ? (
                <Button
                  name="start-game-btn"
                  sx={{ alignItems: 'center' }}
                  variant="contained"
                  onClick={() => {
                    startGame();
                  }}
                  fullWidth
                >
                  <PlayArrowIcon fontSize="medium" sx={{ mr: 1 }} /> Start
                </Button>
                  )
                : (
                <Button
                  name="stop-game-btn"
                  color="error"
                  variant="contained"
                  onClick={stopGame}
                  fullWidth
                >
                  <StopIcon fontSize="medium" sx={{ mr: 1 }} />
                  Stop
                </Button>
                  )}
            </Grid>
            <Grid item xs={6} sm={3} md={6} lg={3}>
              <Button variant="contained" onClick={controlGame} fullWidth>
                <SettingsRemoteIcon fontSize="medium" sx={{ mr: 1 }} /> Control
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <>
        <Dialog open={urlCopy} onClose={handleCopyClose}>
          <DialogTitle sx={{ pb: 0 }}>
            ✏️ Start Your Quiz Now! :
            <IconButton
              name="close-copyurl-btn"
              sx={{ ml: 5, mb: 2 }}
              onClick={handleCopyClose}
            >
              <CloseIcon sx={{ color: '#1876d1' }} />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontSize: '20px', color: '#212121' }}>
              Session ID is {quizStatus}
              <IconButton sx={{ ml: 1, mb: 1 }} onClick={copyUrlToClipboard}>
                <ContentCopyIcon />
              </IconButton>
            </DialogContentText>
            <Typography variant="subtitle2">
              For more details, please click control button
            </Typography>
          </DialogContent>
        </Dialog>
      </>
      <>
        <Dialog open={viewResult} onClose={handleViewResultClose}>
          <DialogTitle>Would you like to view the results?</DialogTitle>
          <DialogActions
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Button onClick={handleViewResultClose}>NO</Button>
            <Button name="show-result-btn" onClick={showResults}>
              YES
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
}

export default Quiz;
