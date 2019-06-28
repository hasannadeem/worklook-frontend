import React, { Component } from 'react';

import AssignmentCard from './assignmentCard';

class Search extends Component {
  state = {
    searchText: ''
  };

  handleSearch = event => {
    this.setState({ searchText: event.target.value });
  };

  render() {
    return (
      <div>
        <input
          className='form-control'
          type='text'
          placeholder='Search'
          aria-label='Search'
          onChange={this.handleSearch}
        />

        <AssignmentCard searchText={this.state.searchText} />
      </div>
    );
  }
}

export default Search;
