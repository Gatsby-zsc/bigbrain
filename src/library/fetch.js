async function fetchPOST (req, bodyInfo, flag) {
  let header;
  if (flag === 'logout' || flag === 'newGame') {
    header = {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  } else if (flag === 'register' || flag === 'login') {
    header = {
      accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  const ret = await fetch('https://bigbrain-backend.onrender.com/' + req, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(bodyInfo),
  });
  return ret;
}

async function fetchGET (req, flag) {
  let header;
  if (flag === 'token') {
    header = {
      accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  }

  if (flag === 'no token') {
    header = {
      accept: 'application/json',
    };
  }
  const ret = await fetch('https://bigbrain-backend.onrender.com/' + req, {
    method: 'GET',
    headers: header,
  });
  return ret.json();
}

async function fetchPut (req, bodyInfo, flag) {
  let header;
  if (flag === 'token') {
    header = {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  }

  if (flag === 'no token') {
    header = {
      'Content-Type': 'application/json',
      accept: 'application/json',
    };
  }
  const ret = await fetch('https://bigbrain-backend.onrender.com/' + req, {
    method: 'PUT',
    headers: header,
    body: JSON.stringify(bodyInfo),
  });
  return ret;
}

// function of make a post or comment into server
async function fetchPost (req, postDetail) {
  const ret = await fetch('https://bigbrain-backend.onrender.com/' + req, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(postDetail),
  });
  return ret.json();
}

async function fetchDelete (req) {
  const ret = await fetch('https://bigbrain-backend.onrender.com/' + req, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return ret.json();
}

export { fetchPOST, fetchGET, fetchPut, fetchPost, fetchDelete };
