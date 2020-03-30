import React from "react";
import { render } from "@testing-library/react";
import AccountList from "./AccountList";

test("Render without crash", () => {
  const { getByTestId, getByText, rerender } = render(
    <AccountList
      accounts={[
        {
          accountToken: "1112",
          accountType: "Saving",
          accountNumber: "8734"
        },
        {
          accountToken: "1176",
          accountType: "Checking",
          accountNumber: "6353"
        }
      ]}
    />
  );
  expect(getByTestId("account-list")).toBeInTheDocument();
  expect(getByText("Saving... 8734")).toBeInTheDocument();
  rerender(
    <AccountList
      accounts={[
        {
          accountToken: "1112",
          accountType: "Saving",
          accountNumber: "9999"
        },
        {
          accountToken: "1176",
          accountType: "Checking",
          accountNumber: "6353"
        }
      ]}
    />
  );
  expect(getByText("Saving... 9999")).toBeInTheDocument();
});
