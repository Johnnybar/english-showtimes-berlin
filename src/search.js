import React from 'react';
import axios from './axios'
import Logo from './logo'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {setSearchResults} from './actions'

const mapStateToProps = function(state) {
  return {movieInfo: state.movieInfo}
};

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTestChange = this.onTestChange.bind(this);
  }
  handleSubmit(e) {
    if (this.state.text != '') {
      var text = this.state.text
      var textarea = document.getElementById('movie-search')
      textarea.value = ''
      axios.get('/getSpecificMovieInfo/' + this.state.text).then((results) => {
        this.props.dispatch(setSearchResults(results.data))
        const movieInfo = this.props.movieInfo
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  onTestChange(e) {
    var key = event.keyCode;
    if (key === 13) {
      if (this.state.text != '') {
        var text = this.state.text
        var textarea = document.getElementById('movie-search')
        textarea.value = ''
        axios.get('/getSpecificMovieInfo/' + this.state.text).then((results) => {
          this.props.dispatch(setSearchResults(results.data))
          const movieInfo = this.props.movieInfo
        }).catch((err) => {
          console.log(err);
        })
      }
    } else {
      return true;
    }
  }

  componentDidMount() {}
  render() {
    if (!this.props) {
      <div>Please search first</div>
    } else {
      <div></div>
    }

    return (<div className='search-container'>
      
      <textarea id='movie-search' onKeyDown={this.onTestChange} value={this.state.value} placeholder='Search movie by title' onChange={(e) => this.setState({text: e.target.value})}></textarea>
      <button className='click-btn' onClick={this.handleSubmit}>Search</button>
      {
        this.props.movieInfo && <ul className='searchResultsContainer'>
            <img className='cinema-page-img' src={this.props.movieInfo.poster_url}/>
            <div className='movie-info'>
              <li>
                <strong>{this.props.movieInfo.name}</strong>
              </li>
              <li>{this.props.movieInfo.year}</li>
              <li>Director: {this.props.movieInfo.director}</li>
              <li>IMDB Rating: {this.props.movieInfo.rating}</li>

              <li>{this.props.movieInfo.plot}</li>
              <li>Stars: {this.props.movieInfo.stars}</li>

              <a className='paint-white-bg-imdb' href={`http://www.imdb.com/title/${this.props.movieInfo.imdb_id}`} target="_blank">
                Check out the IMDB page for {this.props.movieInfo.name}!
              </a>
            </div>
          </ul>
      }
    </div>)
  }
}

export default connect(mapStateToProps)(Search)
