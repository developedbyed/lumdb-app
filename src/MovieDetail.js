import React, { Component } from 'react';
import { Poster } from './Movie';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {

    state = {
        movie: {}
    }

    async componentDidMount() {
        try {

            const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=cb43d8e789fe997e8f71935951457b0b&language=en-US`);
            const movie = await res.json();
            this.setState({
                movie: movie
            })
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { movie } = this.state;
        return (
            <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
                <MovieInfo>
                    <Overdrive id={movie.id}>
                        <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
                    </Overdrive>
                    <div>
                        <h1>{movie.title}</h1>
                        <h3>{movie.release_date}</h3>
                        <p>{movie.overview}</p>
                    </div>
                </MovieInfo>
            </MovieWrapper>
        );
    }
}

export default MovieDetail;


const MovieWrapper = styled.div`
    position: relative;
    padding-top: 50vh;
    background: url(${props => props.backdrop}) no-repeat;
    background-size: cover;
   
    @media (max-width: 768px) {
     padding-top: 30vh;  
     background-position: center;
    }
`;

const MovieInfo = styled.div`
    background: white;
    text-align: left;
    padding: 2rem 10%;
    display: flex;
    @media (max-width: 768px) {
        display:block;
        
    }
    >div{
        margin-left: 20px;
        
    }
    img{
        position:relative;
        top: -5rem;
        height:100%;
        
    }
`;