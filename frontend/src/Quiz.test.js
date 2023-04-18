import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Quiz from './components/Quiz';
import CardHeader from '@mui/material/CardHeader';

describe('Quiz screen test', () => {
  let refresh, setRefresh, props, quizScreen;

  beforeEach(() => {
      refresh = true;
      setRefresh = React.useState;
    
      jest.spyOn(React, 'useState').mockImplementationOnce(() => setRefresh(!refresh))
    
      props = {
        value : refresh,
        function : setRefresh,
          eachQuiz : {
            active :  null, 
            createdAt : '2023-04-16T05:01:38.922Z',
            id :  192718141,
            name :  'Sample Quiz',
            owner: '123', 
            thumbnail: null,
            oidSessions: [127522, 199762, 266996, 287679, 570938, 649093, 731140, 812442, 835061, 905901]
          }
      }
    
      // quizScreen = mount(
      //   <MemoryRouter>
      //       <Quiz {...props}/>
      //   </MemoryRouter>
      // );
  })

  // it ('Quiz title', () => {
  //   expect(quizScreen.find(CardHeader).at(0).props().title).toEqual('Sample Quiz');
  // })
  // it ('Quiz createAt', () => {})
  // it ('Quiz thunmbnail', () => {})

})