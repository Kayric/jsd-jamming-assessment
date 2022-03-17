/* eslint-disable jsx-a11y/anchor-is-valid */
import './SearchBar.css';
import React from 'react';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.search = this.search.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  search (){
    this.props.onSearch(this.state.term);
  }

  handleSearchChange(e) {
    this.setState({term: e.target.value});
  }

  render(){
  return (
  <div className="SearchBar">
  <input placeHolder="Enter A Song, Album, or Artist" onChange={this.handleSearchChange}/>
  <button className="SearchButton">SEARCH</button>
</div>
);
}
}

export default SearchBar;
