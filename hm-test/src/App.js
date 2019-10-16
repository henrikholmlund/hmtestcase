import React, { Fragment, useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import axios from 'axios';
import debounce from 'lodash/debounce';
import logo from './logo.svg';
import './App.css';
import Button from './common/Button';
import Search from './components/Search';
import AutoComplete from './components/Search';

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
};

const FavoriteList = styled.li`
  background: rgba(255, 255, 255, 0.892);
  list-style: none;
  border-bottom: 1px solid #d8d8d8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.14);
  margin: 0;
  padding: 20px;
  border-radius: 4px;
  transition: background 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  width: 800px;
  font-family: Futura, 'Trebuchet MS', Arial, sans-serif;
`;
const StyledH2 = styled.h2`
  font-family: Futura, 'Trebuchet MS', Arial, sans-serif;
`;

const StyledInput = styled.input`
  font: Futura, sans-serif;
  width: 100%;
  max-width: 200px;
  box-sizing: border-box;
  letter-spacing: 1px;
  color: black;
  &::focus {
    outline: none;
  }
`;
const DeleteButton = styled.button`
  background: linear-gradient(90deg, #f4b05d, #f19639);
  color: black;
  font-weight: 900;
  width: 135px;
  height: 68px;
  border: 1px solid #928574;
  border-radius: 0;
  font-size: 1rem;
  display: inline-block;
  transition: all 0.5s;
  text-align: left;
  vertical-align: middle;
  position: relative;
  &[disabled] {
    opacity: 0.5;
  }
  &::after {
    content: '\\00D7';
    text-align: center;
    height: 55px;
    width: 55px;
    background-color: white;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    line-height: 48px;
    text-align: center;
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 40px;
    font-weight: 500;
    overflow: hidden;
  }
`;
function App() {
  const [list, setList] = useState([]);
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('');

  function removeItem(id) {
    console.log(id);
    const newList = list.filter(item => item.objectID !== id);
    console.log(newList);
    setList(newList);
  }
  function addItem(id) {
    const dateAdded = new Date(Date.now()).toLocaleString('sv-SE');
    const newList = data.hits.filter(item => item.objectID === id);
    const newObject = newList[0];
    newObject.dateAdded = dateAdded;
    console.log(newObject);
    setList(list => [...list, newObject]);
  }
  useEffect(() => {
    if (query.length === 0) {
      setData({ hits: [] });
    }
    if (query.length < 3) return;
    const fetchData = async () => {
      // console.log('loading...', query);
      const result = await axios(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setData(result.data);
    };
    fetchData();
  }, [query]);

  return (
    <ThemeProvider theme={theme}>
      <div
        className='App'
        style={{
          backgroundColor: 'white',
          height: '100vh',
          width: '100%',
          margin: '0 auto'
        }}
      >
        <h1>This is the awesome test page</h1>
        <p>Look, a delete button, so great:</p>
        <Button />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <StyledH2>Add your favorite article, h4xxor</StyledH2>
          <StyledInput
            placeholder='Search for something'
            type='text'
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
          <ul>
            {data.hits.map(item => (
              <FavoriteList key={item.objectID} id={item.objectID}>
                <a href={item.url}>{item.title}</a>
                <button onClick={() => addItem(item.objectID)}>Add</button>
              </FavoriteList>
            ))}
          </ul>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <StyledH2>
            These are my favorite articles, added by date, soo exciting!
          </StyledH2>
          <ul id='favorites'>
            {list.map(item => (
              <FavoriteList key={item.objectID}>
                <a href={item.url}>{item.title}</a>
                <span>Added on: {item.dateAdded}</span>
                <DeleteButton
                  type='button'
                  onClick={() => removeItem(item.objectID)}
                >
                  Delete
                </DeleteButton>
              </FavoriteList>
            ))}
          </ul>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
