import React from 'react';
import Button from '@mui/material/Button';
import { fetchGET } from './library/fetch.js'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Quiz from './quiz.jsx';

function Dashboard () {
  const [quizzes, setQuizzes] = React.useState([]);

  // fetch all quizzes from server
  React.useEffect(async () => {
    const res = (await fetchGET('admin/quiz')).quizzes;
    setQuizzes(res);
  }, []);

  return (
    <Box>
      This is Dash board!!!
      <Container maxWidth='xl'>
        <Grid container spacing={1} >
          <Grid item xs={12} md={12} >
            <Button variant='contained' sx={ { mt: 2, mb: 2, mr: 2 } }>Create game</Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
                {
                  quizzes.map(quiz => {
                    return (
                      <Grid item key={quiz.id} xs={12} sm={12} md={6} >
                        <Quiz eachQuiz={quiz}></Quiz>
                      </Grid>
                    )
                  }
                  )
                }
              </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Dashboard;
