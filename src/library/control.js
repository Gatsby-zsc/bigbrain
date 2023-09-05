async function startQuiz (quizId) {
  await fetch(`http://localhost:5005/admin/quiz/${quizId}/start`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

async function stopQuiz (quizId) {
  await fetch(`http://localhost:5005/admin/quiz/${quizId}/end`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export { startQuiz, stopQuiz };
