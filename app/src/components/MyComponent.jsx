import React from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { newContextComponents } from '@drizzle/react-components';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Cryptomon from './Cryptomon';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { AccountData, ContractData, ContractForm } = newContextComponents;

const range = n => Array.from({ length: n }, (_, i) => i);

export default () => {
  const { drizzle, useCacheCall } = useDrizzle();
  const drizzleState = useDrizzleState(state => state);

  const total = useCacheCall('Cryptomons', 'total');

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Cryptomons</Typography>
        </Toolbar>
      </AppBar>
      <AccountData
        drizzle={drizzle}
        drizzleState={drizzleState}
        accountIndex={0}
        units="ether"
        precision={3}
      />

      {range(total).map(i => (
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="Cryptomons"
          method="cryptomons"
          methodArgs={[i]}
          render={data => <Cryptomon {...data} />}
        />
      ))}

      <ContractForm
        drizzle={drizzle}
        drizzleState={drizzleState}
        contract="Cryptomons"
        method="create"
      />
    </Container>
  );
};
