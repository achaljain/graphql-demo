import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import logo from "./logo.svg";
import "./App.css";

import client from "./graphql/client";
import { getUser } from "./graphql/queries";
import useQueryMod from "./graphql/useQueryMod";

function Hello() {
  const [loadData, { error, loading, data }] = useQueryMod(getUser, {
    variables: { userId: "user1" }
  });

  console.log("\nloading: ", loading, "\ndata: ", data, "\nerror: ", error);

  return (
    <div>
      <button onClick={loadData}>Load Data</button>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Hello />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
