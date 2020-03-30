import React, { useState } from "react";
import { getUser } from "../../graphql/queries";
import { useLazyQuery } from "@apollo/react-hooks";
import AccountList from "../AccountList/AccountList";
import { GRAPHQL, FETCH } from "../constants";
import Timeout from "../Timeout/Timeout";

const User = ({ mode }) => {
  const [userId, setUserId] = useState("");
  const [isError, setError] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [loadData, { error, loading, data }] = useLazyQuery(getUser, {
    variables: { userId }
  });
  const [fetchResult, setFetchResult] = useState(null);
  const [hasClicked, setHasClicked] = useState(false);

  const handleChange = e => {
    const { value } = e.target;
    setUserId(value);
  };

  const fetchData = () => {
    fetch("https://my-json-server.typicode.com/kirtisharma1/demo/db")
      .then(json => {
        setFetchResult(json);
      })
      .catch(error => {
        console.error("Failed to fetch", error);
        setFetchError(true);
      });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (userId) {
      debugger;
      if (mode === FETCH) {
        fetchData();
      } else {
        loadData();
      }
      setHasClicked(true);
    } else {
      setError(true);
    }
  };

  if (loading) {
    return <div data-testid="loading-message">loading...</div>;
  }

  return (
    <div>
      <h1>User details</h1>
      {(fetchError || error) && (
        <div data-testid="error-message"> Failed ({mode}) to data</div>
      )}
      <form onSubmit={onSubmit} data-testid="form">
        {data?.getUser?.accounts && mode === GRAPHQL ? (
          <>
            <div>First Name : {data?.getUser?.firstName}</div>
            <div>Last Name : {data?.getUser?.lastName}</div>
            <AccountList accounts={data.getUser.accounts} />
          </>
        ) : (
          fetchResult && (
            <>
              <div>First Name : {fetchResult.data?.getUser?.firstName}</div>
              <div>Last Name : {fetchResult.data?.getUser?.lastName}</div>
              <AccountList accounts={fetchResult.data.getUser.accounts} />
            </>
          )
        )}
        <label htmlFor="userId">
          {isError ? "Error: Please enter User Id" : "User ID: "}
        </label>
        <input
          type="text"
          data-testid="user-input"
          placeholder="Please enter a valid user ID"
          id="userId"
          value={userId}
          onChange={handleChange}
        />
        <button type="submit" data-testid="submit-btn">
          {data ? "Data Loaded" : "Load Data"}
        </button>
        {hasClicked && <Timeout />}
      </form>
    </div>
  );
};

export default User;
