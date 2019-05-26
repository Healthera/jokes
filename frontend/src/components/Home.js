import React from 'react';
import { connect } from 'react-redux';
import { getJokes } from '../actions/jokes';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import JokeCard from './widgets/JokeCard';
import SearchBar from './widgets/SearchBar';
import jokeTypes from './widgets/joketypes';

const defaultTypes = jokeTypes.reduce((acc, el) => ({...acc, [el]: true}), {});

function Home(props) {

    React.useEffect(() => props.getJokes(), []);
    const [filters, setFilters] = React.useState({
        keyword: '',
        types: defaultTypes
    });

    function applyFilters(newfilters) {
        setFilters({ ...filters, ...newfilters })
    }

    const { classes, jokes } = props;
    const filteredJokes = jokes.filter(joke =>
        joke.name.includes(filters.keyword) &&
        Object.keys(joke.types)
            .filter(type => joke.types[type])
            .some(type => Object.keys(filters.types)
            .filter(filteredType => filters.types[filteredType])
            .includes(type)
        )
    );

    return (
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <SearchBar onChange={applyFilters} />
            {
                filteredJokes.map((joke, i) =>
                    <div key={i} className={classes.root}>
                        <JokeCard joke={joke} />
                    </div>
                )
            }
        </div>
    );

}

const mapStateToProps = (state) => ({
    jokes: state.jokes
});

const styles = theme => ({
    root: {
        width: '80%'
    },
});

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getJokes })(withStyles(styles)(Home));
