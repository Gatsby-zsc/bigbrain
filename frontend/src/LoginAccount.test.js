import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Login from './components/Login/LoginAccount.jsx';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

describe('Login screen test', () => {
  const loginScreen = mount(
    <MemoryRouter initialEntries={['/login']}>
        <Login />
    </MemoryRouter>
  );

  it('Check if Login screen render successfully', () => {
    expect(loginScreen.find(Typography).at(0).text()).toEqual('Login in');
  })

  it('check if email textfield render successfully', () => {
    expect(loginScreen.find(TextField).at(0).props().name).toEqual('email');
  })

  it('check if passoword textfield render successfully', () => {
    expect(loginScreen.find(TextField).at(1).props().name).toEqual('password');
  })

  it('check if login button render successfully', () => {
    expect(loginScreen.find(Button).at(0).props().name).toEqual('sign-in-btn');
  })
})
