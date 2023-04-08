// question structure 
/*
question {
  questionId,
  questionType,                 // can be single or multiple
  questionField,
  timeLimit,
  points,
  videoURL,
  imgURL,
  answers: [options...]         // store an array of different options
}
*/

// option structure
/* 
option {
  optionId,
  optionField,
  optionCorrect,                // true or false
}
*/ 

/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  console.log('See question: ', question);
  const options = question.answers.filter( eachOption => {
    eachOption.optionCorrect !== true
  });

  return {
    questionId:question.questionId,
    questionType:question.questionType,                
    questionField:question.questionField,
    timeLimit:question.timeLimit,
    points:question.points,
    videoURL:question.videoURL,
    imgURL:question.imgURL,
    answers : options
  };
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  const correctAnswers = question.answers.filter( eachOption => {
    eachOption.optionCorrect === true;
  });

  const answerIds = correctAnswers.map( eachOption => {
    eachOption.optionId
  });
  
  return answerIds; 
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  const answerIds = question.answers.map( eachOption => {
    eachOption.optionId
  });
  return answerIds;
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  return question.timeLimit;
};
