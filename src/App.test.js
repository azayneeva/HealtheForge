import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('is no excuse not to write tests', () => {
  //so I'm really sorry I didn't have time to write them
});
