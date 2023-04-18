import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Play from './components/Play.jsx';
import TextField from '@mui/material/TextField';

describe('Play screen', () => {
  const playScreen = mount(
    <MemoryRouter initialEntries={['/play']}>
        <Play />
    </MemoryRouter>
  );

  it ('Check if session enter testfield  ', () => {
    expect(playScreen.find(TextField).at(0).props().name).toEqual('session');
  }) 
})