import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import analyzeTime from './library/time.js'
import sampleImg from './sample.jpg'

function Quiz ({ eachQuiz }) {
  const [Quiz, setQuiz] = useState(eachQuiz);
  const [quizId, setQuizId] = useState(eachQuiz.id)
  console.log(quizId);

  useEffect(() => {
    setQuiz(eachQuiz);
  }, [])

  useEffect(() => {
    setQuizId(quizId);
  }, [])

  return (
    <Card sx={ { position: 'relative' } } >
      <IconButton aria-label="delete" sx={ { position: 'absolute', right: 10, top: 10 } }>
        <DeleteIcon />
      </IconButton>
      <CardHeader
        title={Quiz.name}
        subheader={analyzeTime(Quiz.createdAt)}
      />
      <CardMedia
        component='img'
        height='250px'
        image={Quiz.thumbnail ? Quiz.thumbnail : sampleImg}
        alt='Thumbnail'
      />
      <CardContent>
        <Button
          variant='contained'
        >
          Edit game
        </Button>
      </CardContent>
    </Card>
  )
}

export default Quiz;
