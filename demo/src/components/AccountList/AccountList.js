import React from "react";

const AccountList = ({ accounts }) => {
  return (
    <ul data-testid="account-list">
      {accounts.map(account => {
        return (
          <li key={account.accountNumber}>
            {account.accountType}... {account.accountNumber}
          </li>
        );
      })}
    </ul>
  );
};

export default AccountList;
