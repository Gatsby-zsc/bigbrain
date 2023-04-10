import React, { useState } from 'react';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Collapse from '@mui/material/Collapse';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Box from '@mui/material/Box';
import DoneIcon from '@mui/icons-material/Done';
import sampleImg from '../sample.jpg'
import Question from '../Question';
import { WindowBorder } from '../commonComponents';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import question from '../library/question';
import { failNotify, successsNotify } from '../library/notify';
import { fetchPOST, fetchPut, fetchGET } from '../library/fetch';
import { fileToDataUrl } from '../library/helpers.js';

const NewWindowBorder = styled(WindowBorder)({
  marginTop: '10px',
  marginBottom: '10px',
  padding: '0px 10px 20px 10px'
});

function CreateGameButton (props) {
// expended info which allow user to add more info for the new game
  const [expanded, setExpanded] = useState(false);
  const [newThumbnail, setThumbnail] = useState(sampleImg);
  const [newQuestions, setQuestion] = useState([question]);
  const [open, setOpen] = useState(false);
  const [newGame, setNewGame] = useState('');

  const setRefresh = props.function;
  const refresh = props.value;

  function popUpWindow () {
    setOpen(true);
  }

  function closeWindow () {
    setOpen(false);
    setExpanded(false);
    setQuestion([question]);
    setThumbnail(sampleImg);
    setRefresh(!refresh);
    setNewGame('');
  }

  // allow user to edit more info for the created new game
  function moreInfo () {
    setExpanded(!expanded);
  }

  // create an new question when user click more button
  function moreQuestion () {
    const newQestion = question;
    newQestion.questionId = Math.trunc((Date.now() * Math.random())) % 100000;
    newQuestions.push(newQestion);
    setQuestion(newQuestions);
    setRefresh(!refresh);
  }

  // create an new game and popup notification for user
  async function createGame () {
    if (newGame.length === 0) {
      failNotify('Can not create new game with empty name!!!');
      return;
    } else {
      const responseForCreatingGame = await fetchPOST('admin/quiz/new', { name: newGame }, 'newGame');
      if (responseForCreatingGame.status === 200) {
        successsNotify('New game created successfully!!!');
        // if user create questions for current quiz, update quiz after create it
        if (newQuestions.length !== 1) {
          const quizId = (await responseForCreatingGame.json()).quizId;
          const quiz = await fetchGET('admin/quiz/' + quizId);
          const NewQuiz = { ...quiz };

          NewQuiz.name = newGame;
          NewQuiz.thumbnail = newThumbnail;
          NewQuiz.questions = newQuestions;

          const responseForUpdatingGame = await fetchPut('admin/quiz/' + quizId, NewQuiz);
          if (responseForUpdatingGame.status === 200) {
            successsNotify('update quiz successully');
          } else {
            failNotify('update quiz failed!!!');
          }
        }
      } else {
        failNotify('Invalid name!!!');
      }
    }
    setTimeout(() => {
      // refresh dashbaord to show newly created quiz
      setRefresh(!refresh);
      closeWindow();
    }, 2000);
  }

  return (
    <>
      <Button variant='contained' onClick={popUpWindow} sx={{ mr: 2 }}>
        <VideogameAssetIcon sx={{ mr: 1 }} />
        New
      </Button>
      <Dialog open={open} onClose={closeWindow}>
        <DialogTitle>My New Game</DialogTitle>
        <DialogContent sx={ { pb: 0 } }>
          <DialogContentText>
            To successfully create a game, Please enter a title for the new game
          </DialogContentText>
          <NewWindowBorder>
            <Typography
              variant='subtitle2'
              sx={ { mt: 1 } }
            >
             Game title
            </Typography>
            <TextField
              autoFocus
              fullWidth
              label='Game title'
              variant='outlined'
              sx={{ mt: 1 }}
              value={newGame}
              onChange={ (e) => { setNewGame(e.target.value) } }
            />
          </NewWindowBorder>
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <Box sx={ { mt: 2 } }>
              {newQuestions.map(question => {
                return <Question key={question.questionId} value={question} questions={newQuestions} function={setQuestion} />;
              })}
              <Box sx={ { mt: 2 } }>
                <Button variant='contained' sx={ { mr: 2 } } onClick={moreQuestion}>
                  <QuestionAnswerIcon sx={ { mr: 1 } }/>
                    More
                </Button>
                <Button variant='contained' component='label' >
                  { newThumbnail === sampleImg ? <PhotoCamera sx={ { mr: 1 } } /> : <DoneIcon sx={ { mr: 1 } } /> }
                    Upload
                  <input hidden accept='image/*' type='file' onChange={ (e) => {
                    fileToDataUrl(e.target.files[0]).then((data) => {
                      setThumbnail(data);
                    });
                  } } />
                </Button>
              </Box>
            </Box>
          </Collapse>
        </DialogContent>
        <DialogActions>
          <Button onClick={moreInfo}>More Info</Button>
          <Button onClick={closeWindow}>Cancel</Button>
          <Button onClick={createGame}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateGameButton;
