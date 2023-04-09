// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import { fetchPOST } from '../library/fetch';
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

const NewWindowBorder = styled(WindowBorder)({
  marginTop: '10px',
  marginBottom: '10px',
  padding: '0px 10px 20px 10px'
});

const successsNotify = () =>
  toast.success('New game created successfully!!!', {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });

const failNotify = (message) =>
  toast.error(message, {
    position: 'top-center',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });

// options of each question, generate random id for each option
const option1 = {
  optionId: Math.trunc((Date.now() * Math.random())) % 100000,
  optionField: '',
  optionCorrect: false,
}

const option2 = {
  optionId: Math.trunc((Date.now() * Math.random())) % 100000,
  optionField: '',
  optionCorrect: false,
}

// structure of each question, generate random id for question
const question = {
  questionId: Math.trunc((Date.now() * Math.random())) % 100000,
  questionType: 'type',
  questionField: 'My favourite game',
  timeLimit: 0,
  points: 1,
  videoURL: '',
  imgURL: '',
  answers: [option1, option2]
}

function CreateGameButton (props) {
  const [open, setOpen] = useState(false);
  const [newGame, setNewGame] = useState('');
  // expended info which allow user to add more info for the new game
  const [expanded, setExpanded] = useState(false);
  const [thumbnail, setThumbnail] = useState(sampleImg);
  const [questions, setQuestion] = useState([question]);

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
  }

  // allow user to edit more info for the created new game
  function moreInfo () {
    setExpanded(!expanded);
  }

  // create an new question when user click more button
  function moreQuestion () {
    const newQestion = question;
    newQestion.questionId = Math.trunc((Date.now() * Math.random())) % 100000;
    questions.push(newQestion);
    setQuestion(questions);
    setRefresh(!refresh);
  }

  // create an new game and popup notification for user
  async function createGame () {
    if (newGame.length === 0) {
      failNotify('Can not create new game with empty name!!!');
      return;
    } else {
      const res = await fetchPOST('admin/quiz/new', { name: newGame }, 'newGame');
      if (res.status === 200) {
        successsNotify();
        // process more info entered by user
      } else {
        failNotify('Invalid name!!!');
      }
    }
    setTimeout(() => {
      closeWindow();
      // refresh dashbaord to show newly created quiz
      setRefresh(!refresh);
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
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={ { mt: 2 } }>
              {questions.map(question => {
                return <Question key={question.questionId} value={question} questions={questions} function={setQuestion} />;
              })}
              <Box sx={ { mt: 2 } }>
                <Button variant="contained" sx={ { mr: 2 } } onClick={moreQuestion}>
                  <QuestionAnswerIcon sx={ { mr: 1 } }/>
                    More
                </Button>
                <Button variant="contained" component="label" >
                  { thumbnail === sampleImg ? <PhotoCamera sx={ { mr: 1 } } /> : <DoneIcon sx={ { mr: 1 } } /> }
                    Upload
                  <input hidden accept="image/*" multiple type="file" onChange={ (e) => { setThumbnail(e.target.value) } } />
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
