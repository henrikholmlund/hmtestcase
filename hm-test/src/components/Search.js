import React from 'react';
import debounce from 'lodash/debounce';
import Button from '../common/Button';
import { DropDown, DropDownItem, SearchStyles } from '../styles/DropDown';
const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = '';

class AutoComplete extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      loading: false,
      error: '',
      query: ''
    };
  }
  handleChange(event) {
    this.setState({ query: event.target.value });
    console.log(this.state.query);
  }

  // onChange = debounce(async e => {
  //   console.log('searching... ', e.target.value);
  //   //set loading to true
  //   this.setState({ loading: true, value: e.target.value });
  //   // some query to api and res set onchange to async function
  //   // some res bla bla
  //   document.getElementById('input').innerHTML = this.state.value;
  //   await fetch(API + e.target.value)
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         throw new Error('Something went wrong ...');
  //       }
  //     })
  //     .then(data =>
  //       this.setState({
  //         items: data.hits,
  //         loading: false,
  //         query: e.target.value
  //       })
  //     )
  //     .catch(error => this.setState({ error, loading: false }));
  // }, 350);

  render() {
    const { items, loading, error } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }
    if (loading) {
      return <p>Loading ...</p>;
    }
    return (
      <div>
        <input
          id='input'
          type='search'
          className='input'
          placeholder='Search...'
          value={this.state.query}
          onChange={this.handleChange.bind(this)}
        />
        <ul>
          {items.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
              <Button />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AutoComplete;
