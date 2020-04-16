import React, { Component } from "react";

import Aggregator from "./contracts/Aggregator.json";
import getWeb3 from "./getWeb3";
import ContractField from "./ContractField";
import { Grid, GridList, Typography } from "@material-ui/core";

import "./App.css";

class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    currentTime: 0
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      //web3.setProvider(provider);

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log("my accounts:", accounts);
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Aggregator.networks[networkId];
      const instance = new web3.eth.Contract(
        Aggregator.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <GridList cols={100} cellHeight="auto">
          <Grid cols={100}>
            <ContractField
              name="Aggregator"
              instance={this.state.contract}
              accounts={this.state.accounts}
            ></ContractField>
          </Grid>
        </GridList>
      </div>
    );
  }
}
export default App;