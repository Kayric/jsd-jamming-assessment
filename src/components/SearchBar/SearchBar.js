/* eslint-disable jsx-a11y/anchor-is-valid */
import './SearchBar.css';
import React from 'react';

class SearchBar extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      term: ''
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
   
  }

  handleTermChange(e) {
    this.setState({term: e.target.value});
  }

  search (){
    this.props.onSearch(this.state.term);
  }

 

  render(){
  return (
  <div className="SearchBar">
  <input placeHolder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
  <button className="SearchButton" onClick={this.search}>SEARCH</button>
</div>
);
}
}

export default SearchBar;
