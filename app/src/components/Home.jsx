import React from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { newContextComponents } from '@drizzle/react-components';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Cryptomon from './Cryptomon';
import {
  GridList,
  GridListTile,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from '@material-ui/core';
import MaterialForm from './MaterialForm';

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
        <ExpansionPanel defaultExpanded={true}>
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

        <ExpansionPanel defaultExpanded={true}>
          <ExpansionPanelSummary>
            <Typography variant="h5">Cryptomons</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <GridList cellHeight={'auto'} cols={5}>
              {range(total).map(i => (
                <GridListTile key={i}>
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="Cryptomons"
                    method="cryptomons"
                    methodArgs={[i]}
                    render={data => <Cryptomon {...data} />}
                  />
                </GridListTile>
              ))}
            </GridList>
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
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Container>
      <Toolbar />
    </>
  );
};
