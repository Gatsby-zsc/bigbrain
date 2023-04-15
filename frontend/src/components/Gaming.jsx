import React, { useEffect, useState } from 'react';
import { fetchGET, fetchPut } from '../library/fetch';
import Box from '@mui/material/Box';
import { styled } from '@mui/system'
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';

const PlayStyle = styled('div')({
  width: 390,
  position: 'absolute',
  backgroundColor: 'white',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  alignItems: 'center',
  textAlign: 'center',
  borderRadius: '8px',
  boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
})

export default function Gaming () {
  const playerId = useParams().playerId;
  const [questionContext, setQuestionContext] = React.useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [timeLimit, setTimeLimit] = useState(0)
  const [options, setOptions] = useState([])
  const [countDown, setCountDown] = useState(0);
  const [timeUp, setTimeUp] = useState(false)
  const [correctOption, setCorrectOption] = useState([])
  const [questionId, setQuestionId] = useState('')
  const [optionsSelected, setOptionsSelected] = useState([])
  const navigate = useNavigate()

  useEffect(async () => {
    const question = (await fetchGET(`play/${playerId}/question`, 'no token')).question
    setQuestionId(question.questionId)
    setQuestionContext(question.questionField)
    setImgUrl(question.imgURL)
    setVideoUrl(question.videoURL)
    setCountDown(question.timeLimit / 1000)
    setTimeLimit(question.timeLimit)
    setOptions(question.answers)
  }, []);

  useEffect(() => {
    const interval = window.setInterval(async () => {
      const question = (await fetchGET(`play/${playerId}/question`, 'no token')).question
      if (!question) {
        navigate('/results/player/' + playerId)
      }
      if (question.questionId !== questionId) {
        setQuestionId(question.questionId)
        setQuestionContext(question.questionField)
        setImgUrl(question.imgURL)
        setVideoUrl(question.videoURL)
        setCountDown(question.timeLimit / 1000)
        setTimeLimit(question.timeLimit)
        setOptions(question.answers)
        setCorrectOption([])
        setOptionsSelected([])
      }
    }, 500)
    return () => clearInterval(interval)
  }, [timeLimit, questionId])

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (countDown !== 0) { setCountDown(r => r - 1); setTimeUp(true) }
    }, 1000)
    return () => clearInterval(interval)
  }, [timeLimit, countDown])

  useEffect(async () => {
    if (countDown === 0 && timeUp === true) {
      const correctOptions = (await fetchGET(`play/${playerId}/answer`, 'no token')).answerIds
      setCorrectOption(correctOptions)
    }
  }, [countDown, timeUp])

  function checkOptionSelect (optionId) {
    return optionsSelected.includes(optionId);
  }

  async function selectOption (optionId) {
    const newOptionsSelected = [...optionsSelected]
    newOptionsSelected.push(optionId)
    setOptionsSelected(newOptionsSelected)
  }

  function deSelectOption (optionId) {
    const newOptionsSelected = [...optionsSelected]
    newOptionsSelected.splice(newOptionsSelected.indexOf(optionId), 1)
    setOptionsSelected(newOptionsSelected)
  }

  useEffect(async () => {
    await fetchPut(`play/${playerId}/answer`, { answerIds: optionsSelected }, 'no token')
  }, [optionsSelected])

  const optionDiv = options.map((option) => {
    if (correctOption.length === 0) {
      if (checkOptionSelect(option.optionId)) {
        return (
          <Grid item key={option.optionId} xs={6} sx={{ mb: 1 }}>
            <Button onClick={() => { deSelectOption(option.optionId) }} variant="contained" sx={{ width: '95%' }}>{option.optionField}</Button>
          </Grid>
        )
      } else {
        return (
          <Grid item key={option.optionId} xs={6} sx={{ mb: 1 }}>
            <Button onClick={() => { selectOption(option.optionId) }} variant="outlined" sx={{ width: '95%' }}>{option.optionField}</Button>
          </Grid>
        )
      }
    } else {
      if (correctOption.includes(option.optionId)) {
        return (
          <Grid item key={option.optionId} xs={6} sx={{ mb: 1 }}>
            <Button variant="contained" sx={{ width: '95%', backgroundColor: 'green' }}>{option.optionField}</Button>
          </Grid>
        )
      } else {
        return (
          <Grid item key={option.optionId} xs={6} sx={{ mb: 1 }}>
            <Button disabled variant="contained" sx={{ width: '95%' }}>{option.optionField}</Button>
          </Grid>
        )
      }
    }
  }
  )

  return (
    <Box sx={{
      width: '100wh',
      height: '100vh'
    }}>
      <Container maxWidth='md'>
        <PlayStyle>
          <Grid container direction="row" textAlign="center" alignItems="center">
            <Grid item xs={12}>
              {countDown}
            </Grid>
            <Grid item xs={12}>
              {questionContext}
            </Grid>
            <Grid item xs={12}>
              {imgUrl
                ? (
                <>
                  {imgUrl}
                </>
                  )
                : (
                <>
                </>
                  )}
            </Grid>
            <Grid item xs={12}>
              {videoUrl
                ? (
                  <>
                    {videoUrl}
                  </>
                  )
                : (
                  <>
                  </>
                  )}
            </Grid>
            <Grid container>
              {optionDiv}
            </Grid>
          </Grid>
        </PlayStyle>
      </Container>
    </Box>
  );
}
