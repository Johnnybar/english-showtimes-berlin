// ANJAS API IN HER ACTIONS
export function getNews() {
    const url = 'https://newsapi.org/v2/top-headlines?' +
                'sources=crypto-coins-news&' +
                'apiKey=8a37cb8f51b6445faff2aa74c0655cf4'
    return axios.get(url)
      .then(res => {
          return {type: 'FETCH_NEWS', news: res.data.articles};
      });
}

// USED IN HER NEWS Component

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNews } from './actions';


export class FetchNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
    //   news: []
    };
  }

  componentDidMount() {
      this.props.dispatch(getNews())
  }



  render() {
      console.log('inside FetchNews props', this.props);
      if (!this.props.news) {
          return (
              <p>No news...</p>
          )
      } else {
          this.props.news.map(results => {
              console.log('in map');
          })
      }



      return (
          <div className="scroll">

            <ul>
            {this.props.news && this.props.news.map(results => {
                return(
                <div className="newsWrapper" key={results.id}>

                    <h2>{results.title}</h2>
                    <div className="displayNews">
                        <a href={results.url} target="_blank">
                        <img className="newsImg" src={results.urlToImage} />
                        </a>
                        <p>published: {results.publishedAt && results.publishedAt.slice(0,10)}</p>
                        <p>source: {results.source.name}</p>
                    </div>

                </div>
            )
            })}
            </ul>
        </div>
    );
  }
}


const mapStateToProps = (state) => {
    console.log('++++++inside mapStateToProps state', state)
    return {
        news: state.news
    }
}

export default connect(mapStateToProps)(FetchNews);
