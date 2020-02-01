import React from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { newContextComponents } from '@drizzle/react-components';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Web3Utils from 'web3-utils';
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from '@material-ui/core';
import MaterialForm from './MaterialForm';

import Cryptomon from './Cryptomon';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { AccountData, ContractData, ContractForm } = newContextComponents;

const range = n => Array.from({ length: n }, (_, i) => i);

export default () => {
  const { drizzle, useCacheCall } = useDrizzle();
  const drizzleState = useDrizzleState(state => state);

  const total = useCacheCall('Cryptomons', 'total');

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Cryptomons</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary>
            <Typography variant="h5">Account Info</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <AccountData
              drizzle={drizzle}
              drizzleState={drizzleState}
              accountIndex={0}
              units="ether"
              precision={3}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary>
            <Typography variant="h5">Cryptomons</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={2}>
              {range(total).map(i => (
                <Grid item key={i}>
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="Cryptomons"
                    method="cryptomons"
                    methodArgs={[i]}
                    render={data => (
                      <Cryptomon
                        id={i}
                        species={Number(data.species)}
                        owner={data.owner}
                        price={data.price}
                      />
                    )}
                  />
                </Grid>
              ))}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary>
            <Typography variant="h5">Create Cryptomon (Manager)</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ContractForm
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="Cryptomons"
              method="create"
              render={MaterialForm}
            />
            <Typography display="block" variant="caption">
              1 ETH = {Web3Utils.toWei('1', 'ether')}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Container>
      <Toolbar />
    </>
  );
};
