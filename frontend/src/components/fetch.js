async function fetchPOST (req, bodyInfo) {
  const ret = await fetch('http://localhost:5005/' + req, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyInfo),
  })
  return ret;
}

async function fetchGET (req) {
  const ret = await fetch('http://localhost:5005/' + req, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return ret.json();
}

async function fetchPut (req, bodyInfo) {
  const ret = await fetch('http://localhost:5005/' + req, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(bodyInfo),
  })
  return ret.json();
}

// function of make a post or comment into server
async function fetchPost (req, postDetail) {
  const ret = await fetch('http://localhost:5005/' + req, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(postDetail),
  })
  return ret.json();
}

async function fetchDelete (req, postId) {
  const ret = await fetch('http://localhost:5005/' + req, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(postId),
  })
  return ret.json();
}

export {
  fetchPOST,
  fetchGET,
  fetchPut,
  fetchPost,
  fetchDelete
}
