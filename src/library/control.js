async function startQuiz (quizId) {
  await fetch(`https://bigbrain-backend.onrender.com/admin/quiz/${quizId}/start`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

async function stopQuiz (quizId) {
  await fetch(`https://bigbrain-backend.onrender.com/admin/quiz/${quizId}/end`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export { startQuiz, stopQuiz };
