// options of each question, generate random id for each option
const option1 = {
  optionId: Math.trunc((Date.now() * Math.random())) % 100000,
  optionField: 'CSGO',
  optionCorrect: true
}

const option2 = {
  optionId: Math.trunc((Date.now() * Math.random())) % 100000,
  optionField: 'Horizon',
  optionCorrect: false
}

// structure of each question, generate random id for question
const question = {
  questionId: Math.trunc((Date.now() * Math.random())) % 100000,
  questionType: 'single',
  questionField: 'My favourite game',
  timeLimit: 5000,
  points: 1,
  videoURL: '',
  imgURL: '',
  answers: [option1, option2]
}

export default question
