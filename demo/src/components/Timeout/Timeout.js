import React, { useState } from "react";
import useTimeout from "use-timeout";

const Timeout = () => {
  const [message, setMessage] = useState("Data Fetched successfully!");
  useTimeout(() => setMessage("Timeout!"), 10000);

  return <div data-testid="timeout-message">{message}</div>;
};

export default Timeout;
