import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Quiz ({ eachQuiz }) {
  const quizId = 'Id:' + eachQuiz.id;
  const quizCreatedDate = eachQuiz.createdAt;
  const quizName = eachQuiz.name;
  const quizThumbnail = eachQuiz.thumbnail;
  const quizOwner = eachQuiz.owner;
  // const quizStatus = eachQuiz.active;
  // const quizSessions = eachQuiz.oldSessions;
  return (
    <Card>
      <CardHeader
        title={quizName}
        subheader={quizId}
      />
      <CardMedia
        component='img'
        height='100'
        image={quizThumbnail}
        alt='Thumbnail'
      />
      <CardContent>
        <Typography
          variant='body1'
        >
          Quiz Content
        </Typography>
        <Typography
          variant='body2'
        >
          {quizCreatedDate}
        </Typography>
        <Typography
          variant='body2'
        >
          {quizOwner}
        </Typography>
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
