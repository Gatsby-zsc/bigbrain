import React, { useEffect, useState } from 'react';
import { fetchGET } from '../library/fetch';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import { useParams, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import img1 from '../pictures/avatar/1.JPG';
import img2 from '../pictures/avatar/2.JPG';
import img3 from '../pictures/avatar/3.JPG';
import img4 from '../pictures/avatar/4.JPG';
import img5 from '../pictures/avatar/5.JPG';
import img6 from '../pictures/avatar/6.JPG';
import getAvatar from '../library/hashPlayer.js';
import { WindowBorder } from './commonComponents';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

function createData (id, question, type, speed, rawScore, finalScore) {
  return { id, question, type, speed, rawScore, finalScore };
}

function PlayerResults (props) {
  const eachQuestion = props.value;

  const playerId = useParams().playerId;
  const nickname = useParams().playName;

  let [results, setResult] = useState([]);
  const [rows, setRows] = useState([]);

  const avatars = [img1, img2, img3, img4, img5, img6];

  const navigate = useNavigate();

  // fetch result from server
  useEffect(async () => {
    results = await fetchGET(`play/${playerId}/results`, 'no token');
    setResult(results);
  }, []);

  // process result of each question and put it into table
  useEffect(() => {
    const newRow = [];

    if (results.length === 0) {
      return;
    }

    for (const index in eachQuestion) {
      const questionTitle = eachQuestion[index].details.questionField;
      const questionType =
        eachQuestion[index].details.questionType === 'single' ? 'S' : 'M';
      const questionPoints = eachQuestion[index].details.points;
      const questionTime =
        results[index].answeredAt !== null
          ? (new Date(results[index].answeredAt).getTime() -
              new Date(results[index].questionStartedAt).getTime()) /
            1000
          : 0;
      const questionSpeed = questionTime === 0 ? 0 : 1 / questionTime;
      const rawMark = results[index].correct ? questionPoints : 0;
      let finalMark =
        questionType === 'S'
          ? rawMark * questionSpeed
          : rawMark * questionSpeed * 1.5;

      if (isNaN(finalMark)) {
        finalMark = 0;
      }

      // insert each row of data into table
      const id = Number(index) + 1;
      const tableCeil = createData(
        id,
        questionTitle,
        questionType,
        questionSpeed.toFixed(2),
        rawMark,
        finalMark.toFixed(2)
      );
      newRow.push(tableCeil);
    }

    // process total time cost on answering question, total raw/final mark
    let totalRaw = 0;
    let totalFinal = 0;
    for (const row of newRow) {
      totalRaw += Number(row.rawScore);
      totalFinal += Number(row.finalScore);
    }
    const tableCeil = createData(
      '',
      'Total',
      '',
      '',
      totalRaw,
      totalFinal.toFixed(2)
    );
    newRow.push(tableCeil);
    setRows(newRow);
  }, [results]);

  // back to initial localtion to join another game
  function backToTop () {
    navigate('/play')
  }

  return (
    <Container maxWidth='lg' sx={{ pt: 10, height: 'auto' }}>
      <WindowBorder>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2} sx={{ mb: 1 }}>
            <Box sx={{ width: '100px', margin: '0 auto' }}>
              <Avatar
                alt='player avatar'
                src={avatars[getAvatar(nickname)]}
                sx={{ width: 'auto', height: 'auto', mt: 2 }}
              />
            </Box>
            <Typography variant='h5' align='center' sx={ { mt: 1 } }>
              {nickname}
            </Typography>
            <Box sx={ { display: 'flex', justifyContent: 'center' } }>
              <Button variant='contained' fullWidth sx={ { mt: 2, width: '120px' } } onClick={backToTop}>
                <KeyboardReturnIcon sx={ { mr: 1 } }/>Back
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={10}>
            <Typography variant='h5' sx={{ mb: 1 }}>
              Quiz results
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 400 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='left'>Id</TableCell>
                    <TableCell align='left'>Question</TableCell>
                    <TableCell align='left'>Type</TableCell>
                    <TableCell align='left'>Speed</TableCell>
                    <TableCell align='left'>Raw</TableCell>
                    <TableCell align='left'>Final</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        {row.id}
                      </TableCell>
                      <TableCell align='left'>{row.question}</TableCell>
                      <TableCell align='left'>{row.type}</TableCell>
                      <TableCell align='left'>{row.speed}</TableCell>
                      <TableCell align='left'>{row.rawScore}</TableCell>
                      <TableCell align='left'>{row.finalScore}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant='h6' sx={{ mt: 2 }}>
              Note:
            </Typography>
            <Typography variant='body1'>
              Type: S for Single, M for Multiple
              <br />
              Speed: 1 / (answer_time - question_start_time) <br />
              Raw: raw point of each question, if player answers correctly, earn
              question point <br />
            </Typography>
            <Typography variant='body1'>Final:</Typography>
            <Typography variant='body1' sx={{ ml: 4 }}>
              Single: (Raw * Speed) * 1
            </Typography>
            <Typography variant='body1' sx={{ ml: 4 }}>
              Multiple: (Raw * Speed) * 1.5
            </Typography>
          </Grid>
        </Grid>
      </WindowBorder>
    </Container>
  );
}

export default PlayerResults;
