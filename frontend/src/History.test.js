import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import HistoryPanel from './components/History';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

describe('Past results panel test', () => {
  const sessionResultsScreen = mount(
    <MemoryRouter initialEntries={['/homepage/dashboard/history/123']}>
      <HistoryPanel />
    </MemoryRouter>
  )

  it('Check if game title render successfully', () => {
    expect(sessionResultsScreen.find(Typography).at(0).props().name).toEqual('game title');
  })

  it('Check if edit button render successfully', () => {
    expect(sessionResultsScreen.find(Button).at(0).props().name).toEqual('edit');
  })
})
