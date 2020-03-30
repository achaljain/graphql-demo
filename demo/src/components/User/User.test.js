import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  cleanup
} from "@testing-library/react";
import User from "./User";
import { MockedProvider, wait } from "@apollo/react-testing";
import { getUser } from "../../graphql/queries";
import { GRAPHQL, FETCH } from "../constants";

const userDetailsMock = [
  {
    request: { query: getUser, variables: { userId: "user2" } },
    result: {
      data: {
        getUser: {
          userId: "user2",
          firstName: "Mary",
          lastName: "Doe",
          accounts: [
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
          ]
        }
      }
    }
  }
];

let result;
beforeEach(() => {
  console.log("grapgql");
  result = render(
    <MockedProvider mocks={userDetailsMock} addTypename={false}>
      <User mode={GRAPHQL} />
    </MockedProvider>
  );
});

afterEach(cleanup);

describe("User", () => {
  test("renders without crash", () => {
    expect(result.getByText("User details")).toBeInTheDocument();
  });
});

describe("UI test", () => {
  it("Renders a form ", () => {
    expect(result.getByTestId("form")).toBeInTheDocument();
  });
  it("Has an input field", () => {
    expect(result.getByTestId("user-input")).toBeInTheDocument();
  });
  it("Has a button", () => {
    expect(result.getByTestId("submit-btn").textContent).toBe(`Load Data`);
  });
});

describe("Button action", () => {
  it("button clicked without value entered", () => {
    fireEvent.click(result.getByRole("button"));
    expect(
      result.getByLabelText("Error: Please enter User Id")
    ).toBeInTheDocument();
  });
});

describe("Fetch", () => {
  beforeEach(() => {
    result.rerender(
      <MockedProvider mocks={userDetailsMock} addTypename={false}>
        <User mode={FETCH} />
      </MockedProvider>
    );
  });

  test("before fetch", () => {
    expect(result.queryByText("First Name : ", { exact: false })).toBeNull();
  });

  test("success", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(userDetailsMock[0].result));
    fireEvent.change(result.getByTestId("user-input"), {
      target: { value: "user2" }
    });
    expect(result.getByTestId("user-input").value).toBe("user2");
    fireEvent.click(result.getByRole("button"));
    const updatedValue = await waitForElement(() =>
      result.getByText("First Name :", { exact: false })
    );
    expect(updatedValue).toHaveTextContent(`First Name : Mary`);
    expect(result.asFragment()).toMatchSnapshot();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    global.fetch.mockClear();
  });

  test("fetch failed", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject());
    fireEvent.change(result.getByTestId("user-input"), {
      target: { value: "user2" }
    });
    expect(result.getByTestId("user-input").value).toBe("user2");
    fireEvent.click(result.getByRole("button"));
    const updatedValue = await waitForElement(() =>
      result.getByTestId("error-message")
    );

    expect(updatedValue).toHaveTextContent(`Failed (${FETCH}) to data`);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    global.fetch.mockClear();
  });
});

describe("Graphql", () => {
  test("loading ", () => {
    fireEvent.change(result.getByTestId("user-input"), {
      target: { value: "user2" }
    });
    expect(result.getByTestId("user-input").value).toBe("user2");
    fireEvent.click(result.getByRole("button"));
    expect(result.getByTestId("loading-message")).toHaveTextContent(
      "loading..."
    );
  });

  it("success", async () => {
    fireEvent.change(result.getByTestId("user-input"), {
      target: { value: "user2" }
    });
    expect(result.getByTestId("user-input").value).toBe("user2");
    fireEvent.click(result.getByRole("button", { name: /Load Data/i }));
    const updatedValue = await waitForElement(() =>
      result.getByText("First Name :", { exact: false })
    );
    expect(updatedValue).toHaveTextContent("First Name : Mary");
  });
});

describe("timeout", () => {
  test("test timeout", () => {
    jest.useFakeTimers();
    const button = result.getByText("Load Data");
    expect(result.queryByTestId("timeout-message")).toBeNull();
    fireEvent.click(button);
    wait(() => {
      expect(result.getByTestId("timeout-message").textContent).toBe(
        "Data Fetched successfully!"
      );
    });
    jest.advanceTimersByTime(10000);
    wait(() => {
      expect(result.getByTestId("timeout-message").textContent).toBe(
        "Timeout!"
      );
    });
    jest.clearAllTimers();
  });
});
