import React, { useCallback } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import PropTypes from 'prop-types';
import Web3Utils from 'web3-utils';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Input,
  List,
  ListItem
} from '@material-ui/core';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
  card: {
    minWidth: 300
  },
  media: {
    height: 140
  }
});

function Cryptomon({ id, species, owner, price }) {
  const classes = useStyles();

  const { useCacheSend } = drizzleReactHooks.useDrizzle();
  const { send: buy } = useCacheSend('Cryptomons', 'buy');

  return (
    <Card className={classes.card} variant="outlined">
      <CardMedia
        className={classes.media}
        image={`${process.env.PUBLIC_URL}/images/${species}.png`}
      />
      <CardContent>
        <List>
          <ListItem key={0}>
            <Input
              defaultValue={owner}
              disabled
              inputProps={{ 'aria-label': 'owner' }}
            />
          </ListItem>
          <ListItem key={1}>{Web3Utils.fromWei(price, 'ether')} ETH</ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          disabled={price === 0}
          onClick={useCallback(
            () =>
              buy(id, {
                value: Web3Utils.fromWei(price, 'wei')
              }),
            [buy, id, price]
          )}
        >
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
  id: PropTypes.number.isRequired,
  species: PropTypes.number.isRequired,
  owner: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
};

export default Cryptomon;
