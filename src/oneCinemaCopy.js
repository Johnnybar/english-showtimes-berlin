import React from 'react';
import axios from './axios';
import Logo from './logo';
import { connect } from 'react-redux';
import {setAllMovies} from './actions'
// import Api from './api'
// var modules = require('./modules');

const mapStateToProps = function(state) {
    return {
        movies: state.movies

    }
};

class OneCinema extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    componentDidMount() {
        const apiId= this.props.params.cinema;
        (function(callback) {
            'use strict';
            console.log('this is api_id: ', apiId);
            const httpTransport = require('https');
            const responseEncoding = 'utf8';
            const httpOptions = {
                hostname: 'api.cinepass.de',
                port: '443',
                path: '/v4/showtimes/?cinema_id=' + apiId,
                method: 'GET',
                headers: {"X-API-Key":"b1sXUyc70WHFa9rRwMlA8AsCkxxto5Tb"}
            };
            httpOptions.headers['User-Agent'] = 'node ' + process.version;

            // Paw Store Cookies option is not supported

            const request = httpTransport.request(httpOptions, (res) => {
                let responseBufs = [];
                let responseStr = '';

                res.on('data', (chunk) => {
                    if (Buffer.isBuffer(chunk)) {
                        responseBufs.push(chunk);
                    }
                    else {
                        responseStr = responseStr + chunk;
                    }
                }).on('end', () => {
                    responseStr = responseBufs.length > 0 ?
                    Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;

                    callback(null, res.statusCode, res.headers, responseStr);
                });

            });

            // request.write("");
            request.end();
        })((error, statusCode, headers, body) => {

            console.log('ERROR:', error);
            console.log('STATUS:', statusCode);
            console.log('HEADERS:', JSON.stringify(headers));
            console.log('BODY:', JSON.parse(body));
            var newBody = JSON.parse(body);
            let movies = newBody.showtimes;
            console.log(movies);
            this.props.dispatch(setAllMovies(movies));

            // console.log('this is newBody ', movies);////Returns array with all movies in the cinema requested
            // movieList = movies.map(eachMovie=>
            // <div>{eachMovie.id}</div>
            // )
        })
    }
    render() {
        let movies;
        let movieList;
        console.log('this is props movies', this.props.movies);
        movies = this.props.movies
            if (movies) {
                movieList = movies.map(eachMovie =>
                    <div>
                        <div>{eachMovie.movie_id}</div>
                    </div>
                )
            }

        return (
            <div>
                <h2>this is movieList</h2>
                <ul>{movieList}</ul>
                {/* RETURNS NOTHING AND SEEMS TO BE EMPTY */}
            </div>
        );

    }
}
export default connect(mapStateToProps)(OneCinema)
