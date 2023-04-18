import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import SignUp from './components/Login/SignUp';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

describe('SignUp screen test', () => {
  const signUpScreen = mount(
    <MemoryRouter initialEntries={['/signup']}>
        <SignUp />
    </MemoryRouter>
  );

  it('Check if Sign up screen render successfully', () => {
    expect(signUpScreen.find(Typography).at(0).text()).toEqual('Sign up');
  })

  it('check if name/email/password textfield render successfully', () => {
    expect(signUpScreen.find(TextField).at(0).props().name).toEqual('name');
    expect(signUpScreen.find(TextField).at(1).props().name).toEqual('email');
    expect(signUpScreen.find(TextField).at(2).props().name).toEqual('password');
  })

  it('check if sign up button render successfully', () => {
    expect(signUpScreen.find(Button).at(0).props().name).toEqual('sign-up-submit-btn');
  })
})
