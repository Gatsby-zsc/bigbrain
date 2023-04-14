import React, { useState } from 'react'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Collapse from '@mui/material/Collapse'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import Box from '@mui/material/Box'
import DoneIcon from '@mui/icons-material/Done'
import Question from '../Question'
import { WindowBorder } from '../commonComponents'
import { styled } from '@mui/system'
import Typography from '@mui/material/Typography'
import question from '../../library/question'
import { failNotify, successsNotify } from '../../library/notify'
import { fetchPOST, fetchPut, fetchGET } from '../../library/fetch'
import { fileToDataUrl } from '../../library/helpers.js'

const NewWindowBorder = styled(WindowBorder)({
  marginTop: '10px',
  marginBottom: '10px',
  padding: '0px 10px 20px 10px'
})

function CreateGameButton (props) {
// expended info which allow user to add more info for the new game
  const [expanded, setExpanded] = useState(false)
  const [newThumbnail, setThumbnail] = useState(null)
  const [newQuestions, setQuestion] = useState([])
  const [open, setOpen] = useState(false)
  const [newGame, setNewGame] = useState('')

  const setRefresh = props.function
  const refresh = props.value

  function popUpWindow () {
    setOpen(true)
  }

  function closeWindow () {
    setOpen(false)
    setExpanded(false)
    setQuestion([])
    setThumbnail(null)
    setRefresh(!refresh)
    setNewGame('')
  }

  // allow user to edit more info for the created new game
  function moreInfo () {
    setExpanded(!expanded)
  }

  // create an new question when user click more button
  function moreQuestion () {
    const newQestion = question
    newQestion.questionId = Math.trunc((Date.now() * Math.random())) % 100000
    newQuestions.push(newQestion)
    setQuestion(newQuestions)
    setRefresh(!refresh)
  }

  // read json file, modify from helper function
  async function fetchJson (file) {
    const fileExtension = file.name.split('.')
    if (fileExtension[fileExtension.length - 1] !== 'json') {
      failNotify('Please select a json file')
      return
    }

    const reader = new FileReader()
    const dataTextPromise = new Promise((resolve, reject) => {
      reader.onerror = reject
      reader.onload = () => resolve(reader.result)
    })
    reader.readAsText(file)

    // read content of json file, then parse it to object
    const result = JSON.parse(await dataTextPromise)
    setNewGame(result.name)
    setThumbnail(result.thumbnail)
    const newQuestions = []
    // assign new question id
    for (const newQuestion of result.questions) {
      newQuestion.questionId = Math.trunc((Date.now() * Math.random())) % 100000
      // assign new option id
      for (const option of newQuestion.answers) {
        option.optionId = Math.trunc((Date.now() * Math.random())) % 100000
      }
      newQuestions.push(newQuestion)
    }

    setQuestion(newQuestions)
    if (expanded === false) {
      setExpanded(!expanded)
    }
  }

  // create an new game and popup notification for user
  async function createGame () {
    if (newGame.length === 0) {
      failNotify('Can not create new game with empty name!!!')
      return
    }
    // validate each question, we simply check whether user set a
    // single choice question with multiple true answer
    if (newQuestions.length !== 0) {
      for (const question of newQuestions) {
        let countTrue = 0
        for (const option of question.answers) {
          if (option.optionCorrect) {
            countTrue++
          }
          if (option.optionField === '' && option.optionCorrect === true) {
            failNotify('Please enter your option after select it as true answer')
            return
          }
        }
        if (question.questionType === 'single' && countTrue === 0) {
          failNotify('please select at least one answer')
          return
        }
        if (question.questionType === 'single' && countTrue !== 1) {
          failNotify('please select only one answer')
          return
        }
      }
    }

    const responseForCreatingGame = await fetchPOST('admin/quiz/new', { name: newGame }, 'newGame')
    if (responseForCreatingGame.status === 200) {
      // if user create questions for current quiz, update quiz after create it
      const quizId = (await responseForCreatingGame.json()).quizId
      const quiz = await fetchGET('admin/quiz/' + quizId, 'token')
      const NewQuiz = { ...quiz }
      NewQuiz.name = newGame
      NewQuiz.thumbnail = newThumbnail

      if (newQuestions.length !== 0) {
        NewQuiz.questions = newQuestions
      } else {
        NewQuiz.questions = []
      }

      const responseForUpdatingGame = await fetchPut('admin/quiz/' + quizId, NewQuiz)
      if (responseForUpdatingGame.status !== 200) {
        failNotify('update quiz failed!!!')
      }
    } else {
      failNotify('Can not create game!!!')
    }
    successsNotify('New game created successfully!!!')

    setTimeout(() => {
      closeWindow()
    }, 2000)
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
                return <Question key={question.questionId} value={question} questions={newQuestions} function={setQuestion} />
              })}
              <Box sx={ { mt: 2 } }>
                <Button variant='contained' sx={ { mr: 2 } } onClick={moreQuestion}>
                  <QuestionAnswerIcon sx={ { mr: 1 } }/>
                    question
                </Button>
                <Button variant='contained' component='label' >
                  { newThumbnail === null ? <PhotoCamera sx={ { mr: 1 } } /> : <DoneIcon sx={ { mr: 1 } } /> }
                    Upload
                  <input hidden accept='image/*' type='file' onChange={ (e) => {
                    fileToDataUrl(e.target.files[0]).then((data) => {
                      setThumbnail(data)
                    })
                  } } />
                </Button>
              </Box>
            </Box>
          </Collapse>
        </DialogContent>
        <DialogActions>
          <Button onClick={moreInfo}>More</Button>
          <Button component='label'>
            <input hidden type='file' onChange={ (e) => {
              if (e.target.value !== null) {
                fetchJson(e.target.files[0])
              }
              e.target.value = null
            } } />
            Input
           </Button>
          <Button onClick={closeWindow}>Cancel</Button>
          <Button onClick={createGame}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateGameButton
