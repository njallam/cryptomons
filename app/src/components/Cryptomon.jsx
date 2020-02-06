import React, { useCallback, useState } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  TextField
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import HealthBar from './HealthBar';

const useStyles = makeStyles({
  card: {
    minWidth: 300
  },
  media: {
    height: 250
  }
});

function Cryptomon({ id, species, owner, price, health }) {
  const classes = useStyles();

  const {
    drizzle,
    useCacheCall,
    useCacheSend
  } = drizzleReactHooks.useDrizzle();
  const drizzleState = drizzleReactHooks.useDrizzleState(s => ({
    accounts: s.accounts
  }));
  const web3Utils = drizzle.web3.utils;

  const isOwner = owner === drizzleState.accounts[0];
  const isForSale = price !== '0';

  const { maxHealth, attack, defence } =
    useCacheCall('Cryptomons', 'speciess', species) || {};
  const { send: buy } = useCacheSend('Cryptomons', 'buy');
  const { send: sell } = useCacheSend('Cryptomons', 'sell');
  const [sellOpen, setSellOpen] = useState(false);
  const [sellPrice, setSellPrice] = useState(web3Utils.fromWei(price, 'ether'));

  const handleSell = () => {
    sell(id, web3Utils.toWei(sellPrice, 'ether'));
    setSellOpen(false);
  };

  return (
    <>
      <Card className={classes.card} variant="outlined">
        <HealthBar health={health} maxHealth={Number(maxHealth)} />
        <CardMedia
          className={classes.media}
          image={`${process.env.PUBLIC_URL}/images/${species}.png`}
        />
        <CardContent>
          <List>
            <ListItem key={0}>
              <TextField
                label="Owner"
                value={owner}
                variant="outlined"
                disabled
              />
            </ListItem>
            <ListItem key={1}>
              <TextField
                label="Price"
                value={`${web3Utils.fromWei(price, 'ether')} ETH`}
                variant="outlined"
                disabled
              />
            </ListItem>
          </List>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            variant="contained"
            disabled={isOwner || !isForSale}
            onClick={useCallback(
              () =>
                buy(id, {
                  value: web3Utils.fromWei(price, 'wei')
                }),
              [buy, id, web3Utils, price]
            )}
          >
            Buy
          </Button>
          <Button
            size="small"
            color="primary"
            variant="contained"
            disabled={!isOwner}
            onClick={() => setSellOpen(true)}
          >
            Sell
          </Button>
          <Button size="small" color="secondary" variant="contained">
            Breed
          </Button>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={() =>
              new Audio(`${process.env.PUBLIC_URL}/cries/${species}.ogg`).play()
            }
          >
            Fight
          </Button>
        </CardActions>
      </Card>
      <Dialog
        open={sellOpen}
        onClose={() => setSellOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sell Cryptomon</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter sell price below in ETH</DialogContentText>
          <TextField
            value={sellPrice}
            onChange={e => setSellPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSell} color="primary">
            Sell
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

Cryptomon.propTypes = {
  id: PropTypes.number.isRequired,
  species: PropTypes.number.isRequired,
  owner: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  health: PropTypes.number.isRequired
};

export default Cryptomon;
