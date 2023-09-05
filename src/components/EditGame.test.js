import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import EditGame from './EditGame'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

describe('Edit game panel test', () => {
  const editGameScreen = mount(
        <MemoryRouter initialEntries={['/homepage/dashboard/123']}>
            <EditGame />
        </MemoryRouter>
  );

  it('Check if game title render successfully', () => {
    expect(editGameScreen.find(Typography).at(0).text()).toEqual('Enter your new game title');
  })

  it('Check if thunmbnail render successfully', () => {
    expect(editGameScreen.find(Box).at(2).props().alt).toEqual('thumbnail');
  })

  it('check if upload/more-question/update button render successfully', () => {
    expect(editGameScreen.find(Button).at(0).props().name).toEqual('thumbnail');
    expect(editGameScreen.find(Button).at(1).props().name).toEqual('more-question');
    expect(editGameScreen.find(Button).at(2).props().name).toEqual('update');
  })
})
