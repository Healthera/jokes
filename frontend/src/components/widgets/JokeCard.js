import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import classNames from 'classnames';
import { Icon } from '@material-ui/core';
import { connect } from 'react-redux';
import AreYouSureModal from '../modals/AreYouSureModal';
import EditJokeModal from '../modals/EditJokeModal';
import { deleteJoke } from '../../actions/jokes';

const useStyles = makeStyles(theme => ({
    card: {
        padding: theme.spacing(2, 2),
        margin: theme.spacing(2, 0),
    },
    chips: {
        display: 'block',
    },
    chip: {
        margin: theme.spacing(0.5, 0.5),
    }
}));

function JokeCard(props) {
    const classes = useStyles();
    const { joke, auth } = props;
    const since = daysBeen(joke.date);
    const types = Object.keys(joke.types).filter(type => joke.types[type]);

    const deleteCurrentJoke = () => {
        props.deleteJoke(joke.id);
    }

    return (
        <Card className={classNames(classes.card, 'w-100')}>
            <div className="d-flex justify-content-between">
                <CardHeader
                    avatar={
                        <Avatar aria-label="" className={classes.avatar}>
                            <img src={joke.created_by.avatar} className='w-100' alt='avatar' />
                        </Avatar>
                    }
                    title={joke.created_by.name}
                    subheader={since ? `${since} days ago` : 'Today'}
                />
                {
                    auth.isAuthenticated && auth.user.id === joke.created_by._id &&
                    <div className="row">
                        <EditJokeModal joke={joke} />
                        <AreYouSureModal
                            icon={<Icon>delete</Icon>}
                            onAccept={deleteCurrentJoke}
                        />
                    </div>
                }
            </div>
            <CardContent>
                <Typography variant="h5" color="textSecondary" component="h5">
                    {joke.name}
                </Typography>
            </CardContent>
            <CardActions>
                <div className={classes.chips}>
                    {types.map(type => <Chip key={type} label={type} className={classes.chip} />)}
                </div>
            </CardActions>
        </Card>
    );
}

function daysBeen(value) {
    var one_day = 1000 * 60 * 60 * 24;
    var date_ms = new Date(value).getTime();
    var now = new Date().getTime();
    var difference_ms = now - date_ms;
    return Math.round(difference_ms / one_day);
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { deleteJoke })(JokeCard);