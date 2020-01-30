import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, CardContent, CardMedia } from '@material-ui/core';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

function Cryptomon({ species, owner, price }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
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
    </Card>
  );
}

Cryptomon.propTypes = {
  species: PropTypes.number.isRequired,
  owner: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

export default Cryptomon;
