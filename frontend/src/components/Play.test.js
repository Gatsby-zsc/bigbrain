import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Play from './Play.jsx';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

describe('Play screen', () => {
  const playScreen = mount(
    <MemoryRouter initialEntries={['/play']}>
        <Play />
    </MemoryRouter>
  );

  it('Check session enter textfield', () => {
    expect(playScreen.find(TextField).at(0).props().name).toEqual('session');
  })

  it('Check session enter button', () => {
    expect(playScreen.find(Button).at(0).props().name).toEqual('sessionBtn');
  })
})
