import React, { useEffect, useState } from 'react';
import { fetchGET, fetchPut } from '../library/fetch';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { WindowBorder } from './commonComponents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Iframe from 'react-iframe';
import { failNotify } from '../library/notify';

export default function Gaming (props) {
  const eachQuestionPoint = props.value;
  const setEachQuestionPoint = props.function;

  const playerId = useParams().playerId;
  const nickname = useParams().nickname;
  const [questionContext, setQuestionContext] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [timeLimit, setTimeLimit] = useState(0);
  const [options, setOptions] = useState([]);
  const [countDown, setCountDown] = useState(1000000000);
  const [correctOption, setCorrectOption] = useState([]);
  const [questionId, setQuestionId] = useState('');
  const [optionsSelected, setOptionsSelected] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(1);

  const navigate = useNavigate();

  // once the game start and we enter the game lobby, fetch question details from server
  useEffect(async () => {
    const question = (await fetchGET(`play/${playerId}/question`, 'no token'))
      .question;
    setQuestionId(question.questionId);
    setQuestionContext(question.questionField);
    setImgUrl(question.imgURL);
    setVideoUrl(question.videoURL);
    setCountDown(question.timeLimit / 1000);
    setTimeLimit(question.timeLimit);
    setOptions([...question.answers]);
    const currentPoint = question.points;
    const newEachQuestionPoint = [...eachQuestionPoint];
    newEachQuestionPoint.push({
      Index: questionIndex,
      point: currentPoint,
      details: question,
    });
    setQuestionIndex(questionIndex + 1);
    setEachQuestionPoint(newEachQuestionPoint);
  }, []);

  // each 0.5s we fetch question status from server, to check whether
  // admin has advanced question, reset question details
  useEffect(() => {
    const interval = window.setInterval(async () => {
      const question = (await fetchGET(`play/${playerId}/question`, 'no token'))
        .question;
      // quiz is ended, navigate to an new page to show result
      if (!question) {
        navigate(`/results/player/${nickname}/${playerId}`);
      }

      // admin has advanced question
      if (question !== undefined && question.questionId !== questionId) {
        setQuestionId(question.questionId);
        setQuestionContext(question.questionField);
        setImgUrl(question.imgURL);
        setVideoUrl(question.videoURL);
        setCountDown(question.timeLimit / 1000);
        setTimeLimit(question.timeLimit);
        setOptions(question.answers);
        setCorrectOption([]);
        setOptionsSelected([]);
        const currentPoint = question.points;
        const newEachQuestionPoint = [...eachQuestionPoint];
        newEachQuestionPoint.push({
          Index: questionIndex,
          point: currentPoint,
          details: question,
        });
        setQuestionIndex((r) => r + 1);
        setEachQuestionPoint(newEachQuestionPoint);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [timeLimit, questionId, eachQuestionPoint]);

  // time count down each second
  useEffect(() => {
    const interval = window.setInterval(() => {
      if (countDown !== 0) {
        setCountDown((r) => r - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLimit, countDown]);

  // when count down get to zero, fetch result from server
  // and display the correct result for user
  useEffect(async () => {
    if (countDown === 0) {
      const correctOptions = (
        await fetchGET(`play/${playerId}/answer`, 'no token')
      ).answerIds;
      setCorrectOption(correctOptions);
    }
  }, [countDown]);

  // each time when user click answer, send the user' answer to server
  useEffect(() => {
    fetchPut(
      `play/${playerId}/answer`,
      { answerIds: optionsSelected },
      'no token'
    );
  }, [optionsSelected]);

  // when user click an unselected answer, add this answer to the selected array
  function selectOption (optionId) {
    const newOptionsSelected = [...optionsSelected];
    newOptionsSelected.push(optionId);
    setOptionsSelected(newOptionsSelected);
  }

  // when user click a selected answer, remove this answer to the selected array
  function deSelectOption (optionId) {
    const newOptionsSelected = [...optionsSelected];
    newOptionsSelected.splice(newOptionsSelected.indexOf(optionId), 1);
    setOptionsSelected(newOptionsSelected);
  }

  // present optional media
  const Media = () => {
    // both url are provided
    if (imgUrl && videoUrl) {
      return (
        <Grid container spacing={3}>
          <Grid item xs={6} textAlign={'center'}>
            <Box
              component='img'
              alt='img'
              src={imgUrl}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={6} textAlign={'center'}>
            <Iframe
              width='100%'
              url={videoUrl}
              frameBorder='0'
              allow='accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
            web-share'
            />
          </Grid>
        </Grid>
      );
    }
    // only imgurl is provided
    if (imgUrl && !videoUrl) {
      return (
        <Grid item xs={12} textAlign={'center'}>
          <Box component='img' alt='img' src={imgUrl} sx={{ width: '100%' }} />
        </Grid>
      );
    }
    // only videourl is provided
    if (!imgUrl && videoUrl) {
      return (
        <Grid item xs={12} textAlign={'center'}>
          <video controls width='100%'>
            <Iframe
              width='100%'
              url={videoUrl}
              frameBorder='0'
              allow='accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
            web-share'
            />
          </video>
        </Grid>
      );
    }
    // no url provided
    return <></>;
  };

  const OptionDiv = options.map((option) => {
    if (correctOption !== undefined && correctOption.length === 0) {
      // question is not ended
      if (optionsSelected && optionsSelected.includes(option.optionId)) {
        return (
          <Grid item key={option.optionId} xs={6}>
            <Button
              onClick={() => {
                deSelectOption(option.optionId);
              }}
              variant='contained'
              fullWidth
            >
              {option.optionField}
            </Button>
          </Grid>
        );
      } else {
        return (
          <Grid item key={option.optionId} xs={6}>
            <Button
              onClick={() => {
                selectOption(option.optionId);
              }}
              variant='outlined'
              fullWidth
            >
              {option.optionField}
            </Button>
          </Grid>
        );
      }
    } else {
      // question is ended and we show correct answer for user
      if (correctOption.includes(option.optionId)) {
        return (
          <Grid item key={option.optionId} xs={6}>
            <Button
              variant='contained'
              fullWidth
              sx={{ backgroundColor: 'green' }}
              onClick={ () => { failNotify('Question is ended, you can\'t answer this question anymore') } }
            >
              {option.optionField}
            </Button>
          </Grid>
        );
      } else {
        return (
          <Grid item key={option.optionId} xs={6}>
            <Button variant='contained' fullWidth disabled>
              {option.optionField}
            </Button>
          </Grid>
        );
      }
    }
  });

  return (
    <Container maxWidth='md' sx={{ pt: 20 }}>
      <WindowBorder>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h5' textAlign={'center'}>
              {questionContext}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5' textAlign={'center'}>
              {countDown}s
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <Media />
          </Grid>
          <Grid item container spacing={2}>
            {OptionDiv}
          </Grid>
        </Grid>
      </WindowBorder>
    </Container>
  );
}
