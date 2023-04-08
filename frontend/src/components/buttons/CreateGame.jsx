// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import { fetchPOST } from '../library/fetch';

const successsNotify = () =>
  toast.success('New game created successfully!!!', {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });

const failNotify = (message) =>
  toast.error(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });

function CreateGameButton (props) {
  const [open, setOpen] = useState(false);
  const [newGame, setNewGame] = useState('');

  const setRefresh = props.function;
  const refresh = props.value;

  function popUpWindow () {
    setOpen(true);
  }

  function closeWindow () {
    setOpen(false);
  }

  // create an new game and popup notification for user
  async function CreateGame () {
    if (newGame.length === 0) {
      failNotify('Can not create new game with empty name!!!');
      return;
    } else {
      const res = await fetchPOST('admin/quiz/new', { name: newGame }, 'newGame');
      if (res.status === 200) {
        successsNotify();
      } else {
        failNotify('Invalid name!!!');
      }
    }
    setTimeout(() => {
      closeWindow();
      setRefresh(!refresh);
    }, 2000);
  }

  return (
    <>
      <Button variant='contained' onClick={popUpWindow} sx={{ mr: 2 }}>
        <VideogameAssetIcon sx={{ mr: 1 }} />
        New
      </Button>
      <Dialog open={open} onClose={closeWindow}>
        <DialogTitle>My New Game</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To successfully create a game, Please enter a title for the new game
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            label='Game title'
            variant='standard'
            sx={{ mt: 1 }}
            value={newGame}
            onChange={ (e) => { setNewGame(e.target.value) } }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeWindow}>Cancel</Button>
          <Button onClick={CreateGame}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateGameButton;
