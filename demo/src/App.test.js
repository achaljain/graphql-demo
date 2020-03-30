import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import { GRAPHQL, FETCH } from "./components/constants";

test("renders without crash", () => {
  const { getAllByRole } = render(<App />);
  expect(getAllByRole("button")[0]).toHaveTextContent(GRAPHQL);
});

test("button action", () => {
  const { getAllByRole } = render(<App />);
  const button = getAllByRole("button")[0];
  fireEvent.click(button);
  expect(getAllByRole("button")[0]).toHaveTextContent(FETCH);
  fireEvent.click(button);
  expect(getAllByRole("button")[0]).toHaveTextContent(GRAPHQL);
});
