import React, { useEffect, useState } from 'react';
import { fetchGET } from '../library/fetch';
import Box from '@mui/material/Box';
import { styled } from '@mui/system'
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

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
  const [questionContext, setQuestionContext] = React.useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [timeLimit, setTimeLimit] = useState(0)
  const [options, setOptions] = useState([])
  const [buttonValue, setButtonValue] = useState(false)
  console.log(buttonValue)

  useEffect(async () => {
    const playerId = localStorage.getItem('playerId')
    const question = (await fetchGET(`play/${playerId}/question`, 'no token')).question
    console.log(question)
    setQuestionContext(question.questionField)
    setImgUrl(question.imgURL)
    setVideoUrl(question.videoURL)
    setTimeLimit(question.timeLimit)
    setOptions(question.answers)
    console.log(question.answers)
  }, []);

  useEffect(() => {
    const countdown = window.setInterval(() => {
      setTimeLimit(timeLimit - 1000)
    }, 1000)
    return () => clearInterval(countdown)
  }, [])

  // useEffect(async () => {
  //   const correctOption = fetch

  console.log(options)
  const optionDiv = options.map(option => {
    console.log(option)
    return (
      <Grid item key={option.optionId} xs={6} sx={{ mb: 1 }}>
        <Button onClick={() => { setButtonValue(true) }} variant="contained" sx={{ width: '95%', ':active': { backgroundColor: 'red' } }}>{option.optionField}</Button>
      </Grid>
    )
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
              {timeLimit}
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
