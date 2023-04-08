import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import analyzeTime from './library/time.js'
import sampleImg from './sample.jpg'
import { fetchGET, fetchDelete } from './library/fetch.js'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const successsNotify = () =>
  toast.success('Delete game successfully!!!', {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });

// transform time into minutes and seconds
function processTime (time) {
  let retTime = time;
  retTime /= 1000;

  let minutes = 0;
  while (retTime >= 60) {
    retTime -= 60;
    minutes++;
  }

  const totalTime = minutes.toString() + 'm' + retTime.toString() + 's';
  return totalTime;
}

function Quiz (props) {
  const [hide, setHide] = useState(false);
  const [displayType, setDisplayType] = useState('block');
  const eachQuiz = props.eachQuiz;

  const [Quiz] = useState(eachQuiz);
  const [quizId] = useState(eachQuiz.id);
  const [questions, setQuestions] = useState([]);
  const [totalTime, setTotalTime] = useState(0);

  const navigate = useNavigate();
  // delete current quiz by sending request to server
  function deleteGame () {
    fetchDelete('admin/quiz/' + quizId);
    successsNotify();
    setHide(!hide);
  }

  // navigate to new url to edit current quiz
  function editGame () {
    navigate('./' + quizId);
  }

  // request server to get the details of each question for the corresponding quiz
  useEffect(async () => {
    const ret = await fetchGET('admin/quiz/' + quizId);
    setQuestions(ret.questions);
  }, [])

  // reset new time after fetch info of all questions of quiz
  useEffect(() => {
    let newTime = 0;
    for (const eachQuestion of questions) {
      newTime += eachQuestion.timeLimit;
    }

    newTime = processTime(newTime);

    setTotalTime(newTime);
  }, [questions])

  // hide quiz we delete
  useEffect(() => {
    if (hide === true) {
      setDisplayType('none');
    } else {
      setDisplayType('block');
    }
  }, [hide])

  return (
    <Card sx={ { position: 'relative', display: displayType } } >
      <IconButton
        aria-label="delete"
        sx={ { position: 'absolute', right: 10, top: 10 } }
        onClick={deleteGame}
      >
        <DeleteIcon />
      </IconButton>
      <CardHeader
        title={Quiz.name}
        subheader={analyzeTime(Quiz.createdAt)}
      />
      <CardMedia
        component='img'
        height='250px'
        image={Quiz.thumbnail ? Quiz.thumbnail : sampleImg}
        alt='Thumbnail'
      />
      <CardContent>
        <Typography variant='body1'>
          {questions.length} questions
        </Typography>
        <Typography variant='body2'>
          Total time: {totalTime}
        </Typography>
        <Button
          variant='contained'
          onClick={editGame}
        >
          Edit game
        </Button>
      </CardContent>
    </Card>
  )
}

export default Quiz;
