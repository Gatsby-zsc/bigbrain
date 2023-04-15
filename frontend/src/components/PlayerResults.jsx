import React, { useEffect } from 'react';
import { fetchGET } from '../library/fetch';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Container } from '@mui/material';
import { styled } from '@mui/system'
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';

const PlayStyle = styled('div')({
  width: 320,
  height: 338,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  alignItems: 'center',
  textAlign: 'center',
})

function PlayerResults (props) {
  const eachQuestionPoint = props.value
  console.log(eachQuestionPoint)
  const playerId = useParams().playerId;
  const nickname = useParams().playName;
  console.log(nickname)
  const [results, setResults] = React.useState([])

  useEffect(async () => {
    const result = await fetchGET(`play/${playerId}/results`, 'no token')
    setResults(result)
  }, [])

  const resultDiv = results.map((result, index) => {
    if (result.correct) {
      return (
        <Grid container direction='row' justifyContent='center' textAlign='center' sx={{ width: 30, height: 30 }} key={index}>
          <Grid item xs={12} sx={{ border: 1, borderBottom: 0 }}>
          {index + 1}
          </Grid>
          <Grid item xs={12} sx={{ backgroundColor: '#00e676' }}>
            <CheckIcon />
          </Grid>
        </Grid>
      )
    } else {
      return (
        <Grid container direction='row' justifyContent='center' textAlign='center' sx={{ width: 30, height: 30 }} key={index}>
          <Grid item xs={12} sx={{ border: 1, borderBottom: 0 }}>
          {index + 1}
          </Grid>
          <Grid item xs={12} sx={{ backgroundColor: '#ff1744' }}>
            <CloseIcon/>
          </Grid>
        </Grid>
      )
    }
  })

  return (
  <Container>
    <PlayStyle>
      <Box>Here is your results:</Box>
      <Grid container direction='row' justifyContent='center' textAlign='center' sx={{ width: '100wh', height: '100vh' }}>
        {resultDiv}
      </Grid>
    </PlayStyle>
  </Container>);
}

export default PlayerResults;
