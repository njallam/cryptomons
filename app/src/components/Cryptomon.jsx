import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem
} from '@material-ui/core';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
  media: {
    height: 140
  }
});

function Cryptomon({ species, owner, price }) {
  const classes = useStyles();
  return (
    <Card variant="outlined">
      <CardMedia
        className={classes.media}
        image={`${process.env.PUBLIC_URL}/images/${species}.png`}
      />
      <CardContent>
        <List>
          <ListItem key={0}>{owner}</ListItem>
          <ListItem key={1}>{price} wei</ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" variant="contained">
          Buy
        </Button>
        <Button size="small" color="secondary" variant="contained">
          Breed
        </Button>
        <Button size="small" color="secondary" variant="contained">
          Fight
        </Button>
      </CardActions>
    </Card>
  );
}

Cryptomon.propTypes = {
  species: PropTypes.number.isRequired,
  owner: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

export default Cryptomon;
