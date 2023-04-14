import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import analyzeTime from '../library/time.js'
import sampleImg from '../pictures/sample.jpg'
import { fetchGET, fetchDelete } from '../library/fetch.js'
import { useNavigate } from 'react-router-dom'
import StopIcon from '@mui/icons-material/Stop'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import CloseIcon from '@mui/icons-material/Close'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DialogActions from '@mui/material/DialogActions'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { failNotify, successsNotify } from '../library/notify.js'
import HistoryIcon from '@mui/icons-material/History'
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote'
import { startQuiz, stopQuiz } from '../library/control.js'

// transform time into minutes and seconds
function processTime (time) {
  let retTime = time
  retTime /= 1000

  let minutes = 0
  while (retTime >= 60) {
    retTime -= 60
    minutes++
  }

  const totalTime = minutes.toString() + 'm' + retTime.toString() + 's'
  return totalTime
}

function Quiz (props) {
  const eachQuiz = props.eachQuiz
  const [Quiz] = useState(eachQuiz)
  const [quizId] = useState(eachQuiz.id)
  const [questions, setQuestions] = useState([])
  const [totalTime, setTotalTime] = useState(0)
  const [quizStatus, setQuizStatus] = useState(eachQuiz.active)
  const [urlCopy, setUrlCopy] = useState(false)
  const [viewResult, setViewResult] = useState(false)
  const [start, setStart] = useState(false)

  const path = window.location.href.split('/')
    .filter((path) => {
      return path !== ''
    })
  const currentLocation = path[1]

  const refresh = props.value
  const setRefresh = props.function

  // request server to get the details of each question for the corresponding quiz
  useEffect(async () => {
    const ret = await fetchGET('admin/quiz/' + quizId, 'token')
    setQuizStatus(ret.active)
  }, [urlCopy, viewResult, start])

  const handleCopyOpen = () => {
    setUrlCopy(true)
  }

  const handleCopyClose = () => {
    setUrlCopy(false)
  }

  const handleViewResultOpen = () => {
    setViewResult(true)
  }

  const handleViewResultClose = () => {
    setViewResult(false)
  }

  const navigate = useNavigate()
  // delete current quiz by sending request to server
  function deleteGame () {
    fetchDelete('admin/quiz/' + quizId)
    successsNotify('Delete game successfully!!!')
    setRefresh(!refresh)
  }

  // navigate to new url to edit current quiz
  function editGame () {
    navigate('./' + quizId)
  }

  function controlGame () {
    if (quizStatus === null) {
      failNotify('Game not started yet!');
    } else {
      localStorage.setItem('quizId', quizId);
      localStorage.setItem('sessionId', quizStatus);
      navigate(`/ongoing/${quizId}`)
    }
  }

  // request server to get the details of each question for the corresponding quiz
  useEffect(async () => {
    const ret = await fetchGET('admin/quiz/' + quizId, 'token')
    setQuestions(ret.questions)
  }, [])

  // reset new time after fetch info of all questions of quiz
  useEffect(() => {
    let newTime = 0
    for (const eachQuestion of questions) {
      newTime += eachQuestion.timeLimit
    }

    newTime = processTime(newTime)

    setTotalTime(newTime)
  }, [questions])

  return (
    <>
      <Card sx={ { position: 'relative' } } >
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
           <Typography sx={{ mb: 1 }} variant='body1'>
            {questions.length} questions
          </Typography>
          <Typography sx={{ mb: 2 }} variant='body2'>
            Total time: {totalTime}
          </Typography>
          <Button
            variant='contained'
            onClick={editGame}
            sx={ { mr: 2 } }
          >
            <EditNoteIcon fontSize='medium'/> Edit
          </Button>
          <Button
            variant='contained'
            onClick={editGame}
            sx={ { mr: 2 } }
          >
            <HistoryIcon fontSize='medium'/> History
          </Button>
          {quizStatus === null
            ? <Button
            sx={{ alignItems: 'center' }}
            variant='contained'
            onClick={() => { startQuiz(quizId); handleCopyOpen(); setStart(true) }}
          >
            <PlayArrowIcon fontSize='medium'/> Start
          </Button>
            : <Button
          color='error'
          sx={{ alignItems: 'center' }}
          variant='contained'
            onClick={() => { stopQuiz(quizId); handleViewResultOpen(); localStorage.setItem('quizId', quizId); localStorage.setItem('sessionId', quizStatus); setStart(false) }}
          >
            <StopIcon fontSize='medium'/>Stop
          </Button>}
          <Button
            variant='contained'
            onClick={() => { controlGame() }}
            sx={ { ml: 2 } }
          >
            <SettingsRemoteIcon fontSize='medium'/> Control
          </Button>
        </CardContent>
      </Card>
      <>
        <Dialog
          open={urlCopy}
          onClose={handleCopyClose}
        >
          <DialogTitle sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            ✏️ Start Your Quiz Now! :
            <IconButton sx={{ ml: 5 }} onClick={handleCopyClose}><CloseIcon sx={{ color: '#1876d1' }}/></IconButton>
          </DialogTitle>
          <DialogContent sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <DialogContentText sx={{ fontSize: '18px' }}>
              Session ID is {quizStatus}
            </DialogContentText>
            <IconButton onClick={() => { navigator.clipboard.writeText(`${currentLocation}/play/${quizStatus}`); handleCopyClose() }}>
              <ContentCopyIcon/>
            </IconButton>
          </DialogContent>
        </Dialog>
      </>
      <>
        <Dialog
          open={viewResult}
          onClose={handleViewResultClose}
        >
          <DialogTitle >
            Would you like to view the results?
          </DialogTitle>
          <DialogActions sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
           <Button onClick={() => { handleViewResultClose(); localStorage.removeItem('sessionId'); localStorage.removeItem('quizId') }}>NO</Button>
            <Button onClick={() => { handleViewResultClose(); navigate(`/ongoing/${quizId}`) }} >
              YES
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </>

  )
}

export default Quiz
