import React, { useEffect, useState } from 'react';
import { fetchGET } from '../library/fetch.js'

export default function SessionResult () {
  const sessionId = 884485
  const [sessionResult, setSessionResult] = useState([])
  const [sessionQuestion, setSessionQuestion] = useState([])
  console.log(sessionResult)
  console.log(sessionQuestion)

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
    let points = 0;
    let scores = 0;
    for (let j = 0; j < sessionQuestion.length; j++) {
      if (sessionResult[i].answers[j].correct) {
        points = points + sessionQuestion[j].points
        const answeredAt = new Date(sessionResult[i].answers[j].answeredAt)
        const questionStartedAt = new Date(sessionResult[i].answers[j].questionStartedAt)
        scores = scores + sessionQuestion[j].points * (answeredAt.getTime() - questionStartedAt.getTime()) / 1000
      }
    }
    newResultInfo.push({ name: sessionResult[i].name, point: points, score: scores.toFixed(1) })
  }

  console.log(newResultInfo)

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
    correctPercentage.push(((people / sessionResult.length) * 100).toFixed(1))
    averageTime.push((timecost / peopleAnswered).toFixed(1))
  }
  console.log(correctPercentage)
  console.log(averageTime)
  return (<></>);
}
