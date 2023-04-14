import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import { WindowBorder } from './commonComponents'
import { useParams, useNavigate } from 'react-router-dom'
import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { fetchGET, fetchPut } from '../library/fetch.js'
import Option from './Option'
import { failNotify, successsNotify } from '../library/notify.js'

// options of each question, generate random id for each option
const optionTemplate = {
  optionId: Math.trunc((Date.now() * Math.random())) % 100000,
  optionField: '',
  optionCorrect: false
}

function EditQuestion () {
  let optionNumber = 1

  const location = useParams()
  const questionId = Number(location.questionId)
  const quizId = Number(location.quizId)

  const [quiz, setQuiz] = useState({})
  const [newQuestions, setQuestions] = useState(quiz.questions)

  const [newType, setType] = useState('type')
  const [newField, setField] = useState('')
  const [newPoints, setPoints] = useState(1)
  const [newLimit, setTimeLimit] = useState(5000)
  const [newVideoURL, setVideoURL] = useState('')
  const [newImgURL, setImgURL] = useState('')
  const [newOptions, setOptions] = useState([])

  const navigate = useNavigate()

  // fetch quiz info from server
  useEffect(async () => {
    const ret = await fetchGET('admin/quiz/' + quizId, 'token')
    setQuestions(ret.questions)
    setQuiz(ret)
  }, [])

  // update all states after fetching quiz from server
  useEffect(() => {
    if (newQuestions !== undefined) {
      for (const question of newQuestions) {
        if (Number(question.questionId) === questionId) {
          setType(question.questionType)
          setField(question.questionField)
          setPoints(question.points)
          setTimeLimit(question.timeLimit)
          setVideoURL(question.videoURL)
          setImgURL(question.imgURL)
          setOptions(question.answers)
        }
      }
    }
  }, [quiz])

  function addOption () {
    // we have at most 6 options
    if (optionNumber === 7) {
      return
    }
    const addOptions = [...newOptions]
    const option = optionTemplate
    option.optionId = Math.trunc((Date.now() * Math.random())) % 100000
    addOptions.push(option)
    setOptions(addOptions)
  }

  function deleteOption () {
    // we have at least 3 options
    if (optionNumber === 3) {
      return
    }

    const deleteOptions = []
    for (const option of newOptions) {
      if (option !== newOptions[newOptions.length - 1]) {
        deleteOptions.push(option)
      }
    }
    setOptions(deleteOptions)
  }

  function backToQuestionPanel () {
    navigate(-1)
  }

  async function updateQuestion () {
    const newQuestion = {
      questionId: location.questionId,
      questionType: newType,
      questionField: newField,
      points: newPoints,
      timeLimit: newLimit,
      videoURL: newVideoURL,
      imgURL: newImgURL,
      answers: newOptions
    }
    // update question
    const newQuestions = quiz.questions.map((eachQuestion) => {
      if (eachQuestion.questionId === questionId) {
        return newQuestion
      } else {
        return eachQuestion
      }
    })

    const newQuiz = { ...quiz }
    newQuiz.questions = newQuestions

    // validate each question, we simply check whether user set a
    // single choice question with multiple true answer
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
        if (option.optionField === '' && option.optionCorrect === false) {
          failNotify('Please set up all your options')
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

    const res = await fetchPut('admin/quiz/' + quizId, newQuiz)
    if (res.status === 200) {
      successsNotify('update question successfully')
    } else {
      failNotify('update question failed')
    }
  }

  return (
    <WindowBorder>
      <Container maxWidth='sm'>
        <Box sx={ { mt: 0, mb: 2 } } >
          <Typography
            variant='h5'
            sx={ { mt: 1, mb: 1 } }
          >
            Question title
          </Typography>
          <TextField
            variant='outlined'
            value={newField}
            onChange={(e) => { setField(e.target.value) } }
            fullWidth
          />
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography
                variant='subtitle2'
                sx={ { mt: 1, mb: 1 } }
              >
                Type
              </Typography>
              <Select
                value={newType}
                onChange={(e) => { setType(e.target.value) } }
                fullWidth
              >
                <MenuItem value='type'>None</MenuItem>
                <MenuItem value='single'>single</MenuItem>
                <MenuItem value='multiple'>multiple</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant='subtitle2'
                sx={ { mt: 1, mb: 1 } }
              >
                Points
              </Typography>
              <Select
                value={newPoints}
                onChange={(e) => { setPoints(e.target.value) } }
                fullWidth
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant='subtitle2'
                sx={ { mt: 1, mb: 1 } }
              >
                Time limit
              </Typography>
              <Select
                value={newLimit}
                onChange={(e) => { setTimeLimit(e.target.value) } }
                fullWidth
              >
                <MenuItem value={0}>0s</MenuItem>
                <MenuItem value={5000}>5s</MenuItem>
                <MenuItem value={10000}>10s</MenuItem>
                <MenuItem value={15000}>15s</MenuItem>
                <MenuItem value={30000}>30s</MenuItem>
                <MenuItem value={60000}>1min</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Typography
            variant='subtitle2'
            sx={ { mt: 1, mb: 1 } }
          >
            Question videoURL (optional)
          </Typography>
          <TextField
            value={newVideoURL}
            variant='outlined'
            onChange={(e) => { setVideoURL(e.target.value) } }
            fullWidth
          />
          <Typography
            variant='subtitle2'
            sx={ { mt: 1, mb: 1 } }
          >
            Question imgURL (optional)
          </Typography>
          <TextField
            value={newImgURL}
            variant='outlined'
            onChange={(e) => { setImgURL(e.target.value) } }
            fullWidth
          />
          <Grid container spacing={1}>
            {newOptions && newOptions.map(option => {
              return (
                <Grid
                  item
                  xs={6}
                  key={option.optionId}
                >
                  <Option
                    oid={optionNumber++}
                    value={option}
                    options={newOptions}
                    optionFunction={setOptions}
                  />
                </Grid>
              )
            })}
          </Grid>
          <Grid container spacing={1} sx={ { mt: 3 } }>
            <Grid item xs={6}>
              <Button fullWidth variant='outlined' onClick={addOption}>More</Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant='outlined' onClick={deleteOption}>Delete</Button>
            </Grid>
          </Grid>
        <Button variant='contained' fullWidth sx={ { mt: 2 } } onClick={updateQuestion}>Update Question !!!</Button>
        <Button variant='contained' fullWidth sx={ { mt: 2 } } onClick={backToQuestionPanel}>Cancel</Button>
        </Box>
      </Container>
    </WindowBorder>
  )
}

export default EditQuestion
