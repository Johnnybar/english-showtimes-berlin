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
    this.state = {
      movieFound: false
    }
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
      }).then(()=>{
        this.setState({movieFound: true})
      })
      .catch((err) => {
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
          this.props.dispatch(setSearchResults(results.data.Search[0]))
          const movieInfo = this.props.movieInfo

        }).catch((err) => {
          console.log(err);
        })
      }
    } else {
      return true;
    }
  }

  componentDidMount() {

  }
  render() {
    if (!this.props) {
      <div>Please search first</div>
    }


    return (<div className='search-container'>

      <textarea id='movie-search'
      // onKeyDown={this.onTestChange}
      value={this.state.value} placeholder='Search movie by title' onChange={(e) => this.setState({text: e.target.value})}></textarea>
      <button className='click-btn' onClick={this.handleSubmit}>Search</button>
      {
        this.props.movieInfo && this.state.movieFound === true &&
        <ul className='searchResultsContainer'>
            <img className='cinema-page-img' src={this.props.movieInfo.Poster}/>
            <div className='movie-info'>
              <li>
                <strong>{this.props.movieInfo.Title}</strong>
              </li>
              <li>{this.props.movieInfo.Year}</li>
              <li>Actors: {this.props.movieInfo.Actors}</li>
              <li>Director: {this.props.movieInfo.Director}</li>
              <li>Awards: {this.props.movieInfo.Awards}</li>
              <li>Genre: {this.props.movieInfo.Genre}</li>
              <li>Language: {this.props.movieInfo.Language}</li>
              <li>IMDB Rating: {this.props.movieInfo.imdbRating}</li>

              <li>{this.props.movieInfo.Plot}</li>

              <a className='paint-white-bg-imdb' href={`http://www.imdb.com/title/${this.props.movieInfo.imdbID}`} target="_blank">
                Check out the IMDB page for {this.props.movieInfo.Title}!
              </a>
            </div>
          </ul>
      }
    </div>)
  }
}

export default connect(mapStateToProps)(Search)
