// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
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

function CreateGameButton (props) {
  // options of each question
  const option = {
    optionId: 0,
    optionField: '',
    optionCorrect: false,
  }

  // structure of each question
  const question = {
    questionId: Date.now() % 1000000,
    questionType: '',
    questionField: '',
    timeLimit: 0,
    points: 0,
    videoURL: null,
    imgURL: null,
    answers: [option]
  }

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
    newQestion.questionId = Date.now() % 1000000;
    questions.push(newQestion);
    console.log(questions)
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
          <TextField
            autoFocus
            fullWidth
            label='Game title'
            variant='standard'
            sx={{ mt: 1 }}
            value={newGame}
            onChange={ (e) => { setNewGame(e.target.value) } }
          />
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={ { mt: 2 } }>
              {questions.map(question => {
                return <Question key={question.questionId} value={questions} function={setQuestion}/>;
              })}
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
