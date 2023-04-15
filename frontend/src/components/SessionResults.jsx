import React, { useEffect, useState } from 'react';
import { fetchGET } from '../library/fetch.js'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function SessionResult (props) {
  const sessionId = props.value
  const [sessionResult, setSessionResult] = useState([])
  const [sessionQuestion, setSessionQuestion] = useState([])

  useEffect(async () => {
    const sessionResults = (await fetchGET(`admin/session/${sessionId}/results`, 'token')).results
    setSessionResult(sessionResults)
  }, [])

  useEffect(async () => {
    const sessionQuestions = (await fetchGET(`admin/session/${sessionId}/status`, 'token')).results.questions
    setSessionQuestion(sessionQuestions)
  }, [])

  const newResultInfo = [];
  for (let i = 0; i < sessionResult.length; i++) {
    let correctNums = 0;
    let points = 0;
    let scores = 0;
    for (let j = 0; j < sessionQuestion.length; j++) {
      if (sessionResult[i].answers[j].correct) {
        points = points + sessionQuestion[j].points
        correctNums = correctNums + 1
        const answeredAt = new Date(sessionResult[i].answers[j].answeredAt)
        const questionStartedAt = new Date(sessionResult[i].answers[j].questionStartedAt)
        scores = scores + sessionQuestion[j].points * (answeredAt.getTime() - questionStartedAt.getTime()) / 1000
      }
    }
    newResultInfo.push({ name: sessionResult[i].name, point: points, score: scores.toFixed(1), correctNum: correctNums })
  }

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

  newResultInfo.sort((a, b) => b.score - a.score)
  const topFive = newResultInfo.slice(0, 5)
  console.log(correctPercentage)
  console.log(averageTime)
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">RANK</StyledTableCell>
              <StyledTableCell align="right">NAMES</StyledTableCell>
              <StyledTableCell align="right">CORRECT ANSWERS</StyledTableCell>
              <StyledTableCell align="right">SCORES</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topFive.map((player, index) => (
              <StyledTableRow key={player.name}>
                <StyledTableCell align="right">{index + 1}</StyledTableCell>
                <StyledTableCell align="right">{player.name}</StyledTableCell>
                <StyledTableCell align="right">{player.correctNum}</StyledTableCell>
                <StyledTableCell align="right">{player.score}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <BarChart width={700} height={250} data={correctPercentage}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="question" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="percentage" fill="#1876d1" />
      </BarChart>
      <BarChart width={700} height={250} data={averageTime}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="questionTime" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="AverageTimeCost" fill="#1876d1" />
      </BarChart>
    </>);
}
