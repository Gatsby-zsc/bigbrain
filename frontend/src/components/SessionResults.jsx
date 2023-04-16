import React, { useEffect, useState } from 'react';
import { fetchGET } from '../library/fetch.js'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Container } from '@mui/material';
import { WindowBorder } from './commonComponents'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function SessionResult (props) {
  const sessionId = props.value
  const size = props.size
  const [sessionResult, setSessionResult] = useState([])
  const [sessionQuestion, setSessionQuestion] = useState([])

  // fetch result from server
  useEffect(async () => {
    const sessionResults = (await fetchGET(`admin/session/${sessionId}/results`, 'token')).results
    setSessionResult(sessionResults)
  }, [])

  // fetch question from server
  useEffect(async () => {
    const sessionQuestions = (await fetchGET(`admin/session/${sessionId}/status`, 'token')).results.questions
    setSessionQuestion(sessionQuestions)
  }, [])

  // process result of each person's peformance of each question and put it into table
  const newResultInfo = [];
  for (let i = 0; i < sessionResult.length; i++) {
    let correctNums = 0;
    let scores = 0;
    let timeCost = 0;
    let questionNum = 0;
    let timeCostPerQuestion = ''
    for (let j = 0; j < sessionQuestion.length; j++) {
      if (sessionResult[i].answers[j].answeredAt !== null) {
        const answeredAt = new Date(sessionResult[i].answers[j].answeredAt)
        const questionStartedAt = new Date(sessionResult[i].answers[j].questionStartedAt)
        timeCost = timeCost + (answeredAt.getTime() - questionStartedAt.getTime()) / 1000
        questionNum = questionNum + 1
      }
      if (sessionResult[i].answers[j].correct) {
        correctNums = correctNums + 1
        const answeredAt = new Date(sessionResult[i].answers[j].answeredAt)
        const questionStartedAt = new Date(sessionResult[i].answers[j].questionStartedAt)
        if (sessionQuestion[j].questionType === 'single') {
          scores = scores + sessionQuestion[j].points / ((answeredAt.getTime() - questionStartedAt.getTime()) / 1000)
        } else {
          scores = scores + (sessionQuestion[j].points * 1.5 / ((answeredAt.getTime() - questionStartedAt.getTime()) / 1000))
        }
      }
    }
    if (questionNum === 0) {
      timeCostPerQuestion = '-'
    } else {
      timeCostPerQuestion = (timeCost / questionNum).toFixed(2)
    }
    newResultInfo.push({ name: sessionResult[i].name, score: scores.toFixed(2), correctNum: correctNums, AverageTimeCost: timeCostPerQuestion })
  }

  // process result of each question's player's average performance
  const correctPercentage = []
  const averageTime = []
  for (let i = 0; i < sessionQuestion.length; i++) {
    let people = 0;
    let peopleAnswered = 0;
    let timecost = 0;
    for (let j = 0; j < sessionResult.length; j++) {
      if (sessionResult[j].answers[i].answeredAt !== null) {
        peopleAnswered = peopleAnswered + 1
        const answeredAt = new Date(sessionResult[j].answers[i].answeredAt)
        const questionStartedAt = new Date(sessionResult[j].answers[i].questionStartedAt)
        timecost = timecost + (answeredAt.getTime() - questionStartedAt.getTime()) / 1000
      }
      if (sessionResult[j].answers[i].correct) {
        people = people + 1
      }
    }
    correctPercentage.push({ question: `Q${i + 1}`, percentage: ((people / sessionResult.length) * 100).toFixed(1) })
    if (timecost === 0 || peopleAnswered === 0) {
      averageTime.push({ questionTime: `Q${i + 1}`, AvergeTimeCost: '0' })
    } else {
      averageTime.push({ questionTime: `Q${i + 1}`, AverageTimeCost: (timecost / peopleAnswered).toFixed(1) })
    }
  }

  newResultInfo.sort((a, b) => b.score - a.score);
  const topFive = newResultInfo.slice(0, 5);

  return (
    <Container maxWidth='lg' sx={ { pt: 2, height: 'auto', overflow: 'auto' } } >
      <WindowBorder>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">RANK</TableCell>
                <TableCell align="left">NAME</TableCell>
                <TableCell align="left">CorrectAnswerNum</TableCell>
                <TableCell align="left">AverageTimeCost&nbsp;(s)</TableCell>
                <TableCell align="left">SCORE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topFive.map((player, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">{player.name}</TableCell>
                  <TableCell align="left">{player.correctNum}</TableCell>
                  <TableCell align="left">{player.AverageTimeCost}</TableCell>
                  <TableCell align="left">{player.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box textAlign={'start'}>
          <Typography variant='h6' sx={ { mt: 2 } }>
            Note:
          </Typography>
          <Typography variant='body1'>
            AverageTimeCost: answer_time_each_question / question_num
          </Typography>
          <Typography variant='body1'>
            Final: (Question_point / Time_cost) * 1 Single
          </Typography>
          <Typography variant='body1' sx={ { ml: 4 } }>
            &nbsp;(Question_point / Time_cost) * 1.5 Multiple
          </Typography>
        </Box>
        <Grid container sx={{ mt: 3 }} justifyContent="space-around" >
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <BarChart width={size} height={250} data={correctPercentage} >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="question" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="percentage" fill="#1876d1" />
            </BarChart>
            <Typography variant='overline' sx={ { mt: 1 } }>
              People got certain question correct
            </Typography>
          </Box>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <BarChart width={size} height={250} data={averageTime} >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="questionTime" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="AverageTimeCost" fill="#1876d1" />
            </BarChart>
            <Typography variant='overline' sx={ { mt: 1 } }>
              Average answer time for each question
            </Typography>
          </Box>
        </Grid>
      </WindowBorder>
    </Container>);
}
