import React from 'react';
import debounce from 'lodash/debounce';
import { DropDown, DropDownItem, SearchStyles } from '../styles/DropDown';

const Search = () => {
  return (
    <SearchStyles>
      <DropDown>
        <DropDownItem>hej</DropDownItem>
      </DropDown>
    </SearchStyles>
  );
};

export default Search;
