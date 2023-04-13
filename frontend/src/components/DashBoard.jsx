import React, { useState, useEffect } from 'react';
import { fetchGET } from './library/fetch.js'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Quiz from './Quiz.jsx';

// sort all quizzes to display them in order on dashboard
function sortQuiz (q1, q2) {
  const check = Date.parse(q2.createdAt) - Date.parse(q1.createdAt);
  return check;
}

function DashBoard (props) {
  const [quizzes, setQuizzes] = useState([]);

  const setRefresh = props.function;
  const refresh = props.value;

  // fetch all quizzes from server
  useEffect(async () => {
    const res = (await fetchGET('admin/quiz')).quizzes;
    const newRes = res.sort(sortQuiz);
    setQuizzes(newRes);
  }, []);

  // listen refresh to check whether we create an new game,
  // if so, refresh quizzes panel

  useEffect(async () => {
    const res = (await fetchGET('admin/quiz')).quizzes;
    const newRes = res.sort(sortQuiz);
    setQuizzes(newRes);
  }, [refresh]);

  return (
    <Box>
      <Container maxWidth='xl'>
        <Grid container spacing={1} >
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
                {
                  quizzes.map(quiz => {
                    return (
                      <Grid item key={quiz.id} xs={12} sm={12} md={6} >
                        <Quiz eachQuiz={quiz} value={refresh} function={setRefresh}></Quiz>
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

export default DashBoard;
