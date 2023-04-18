import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import EditQuestion from './components/EditQuestion';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

describe('Question edit test', () => {
  const questionEditScreen = mount(
    <MemoryRouter initialEntries={['/homepage/dashboard/1234/1234']}>
        <EditQuestion/>
    </MemoryRouter>
  );

  it('Check if question panel render successfully', () => {
    expect(questionEditScreen.find(Typography).at(0).text()).toEqual('Question Title');
  })

  it('check if URL textfield render successfully', () => {
    expect(questionEditScreen.find(TextField).at(1).props().name).toEqual('videoURL');
    expect(questionEditScreen.find(TextField).at(2).props().name).toEqual('imgURL');
  })

  it('check if update/cancel button render successfully', () => {
    expect(questionEditScreen.find(Button).at(2).props().name).toEqual('update');
    expect(questionEditScreen.find(Button).at(3).props().name).toEqual('cancel');
  })
})
