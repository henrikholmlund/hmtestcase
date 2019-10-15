import React from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import logo from './logo.svg';
import './App.css';
import Button from './common/Button';
import Search from './components/Search';

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Button />
      </div>
    </ThemeProvider>
  );
}

export default App;
