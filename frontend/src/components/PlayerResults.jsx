import React, { useEffect } from 'react';
import { fetchGET } from '../library/fetch';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import img1 from '../pictures/avatar/1.JPG'
import img2 from '../pictures/avatar/2.JPG'
import img3 from '../pictures/avatar/3.JPG'
import img4 from '../pictures/avatar/4.JPG'
import img5 from '../pictures/avatar/5.JPG'
import img6 from '../pictures/avatar/6.JPG'
import getAvatar from '../library/hashPlayer.js'
import { WindowBorder } from './commonComponents'

function PlayerResults (props) {
  const eachQuestionPoint = props.value
  console.log(eachQuestionPoint)
  const playerId = useParams().playerId;
  const nickname = useParams().playName;
  const [results, setResults] = React.useState([])

  const avatars = [img1, img2, img3, img4, img5, img6];

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
    <Container maxWidth='md' sx={ { pt: 10, height: 'auto' } }>
      <WindowBorder>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4} sx={ { mb: 1 } }>
          <Box sx={ { width: '100px', margin: '0 auto' } }>
            <Avatar
              alt='player avatar'
              src={avatars[getAvatar(nickname)]}
              sx={{ width: 'auto', height: 'auto', mt: 1 }}
            />
          </Box>
          <Typography variant='h5' align='center'>
            {nickname}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant='h5'>Here is your results:</Typography>
          <Grid container >
            {resultDiv}
          </Grid>
        </Grid>
      </Grid>
      </WindowBorder>
    </Container>
  );
}

export default PlayerResults;
