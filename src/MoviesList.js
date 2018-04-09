import React, { PureComponent } from 'react';
import Movie from './Movie';
import styled from 'styled-components';

class MoviesList extends PureComponent {

    state = {
        movies: []
    }

    async componentDidMount() {
        try {

            const res = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=cb43d8e789fe997e8f71935951457b0b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1');
            const movies = await res.json();
            this.setState({
                movies: movies.results
            })
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        console.log(this.state.movies);
        return (
            <MovieGrid>
                {this.state.movies.map(movie => <Movie key={movie.id} movie={movie} />)}
            </MovieGrid>
        );
    }
}

export default MoviesList;


const MovieGrid = styled.div`
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(6,1fr);
    @media (max-width: 768px){
        grid-template-columns: repeat(2,1fr);
    }
`;