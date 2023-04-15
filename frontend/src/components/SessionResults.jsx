import React, { useEffect, useState } from 'react';
import { fetchGET } from '../library/fetch.js'

export default function SessionResult () {
  const sessionId = 299346
  const [sessionResult, setSessionResult] = useState([])
  const [sessionQuestion, setSessionQuestion] = useState([])
  console.log(sessionResult)
  console.log(sessionQuestion)
  useEffect(async () => {
    const sessionResults = (await fetchGET(`admin/session/${sessionId}/results`, 'token')).results[0]
    setSessionResult(sessionResults)
  }, [])

  useEffect(async () => {
    const sessionQuestions = (await fetchGET(`admin/session/${sessionId}/status`, 'token')).results.questions
    setSessionQuestion(sessionQuestions)
  }, [])

  return (<></>);
}
