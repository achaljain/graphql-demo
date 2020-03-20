import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";

const useQueryMod = (query, options) => {
  const MOCK = process.env.API_MOCK || "OFF"

  const [mockHeader, setMockHeader] = useState(false);

  const getOptions = () => {
    const modOptions = { ...options };

    if (mockHeader) {
      const modContext = options.context || {};
      const modHeaders = modContext.headers || {}
      modHeaders.mock = true
      modOptions.context = modContext;
    }

    return modOptions;
  };

  const [queryResponse, setQueryResponse] = useState({
    loading: false,
    data: false,
    error: false
  });

  const [
    getData,
    { loading: queryLoading, error: queryError, data: queryData }
  ] = useLazyQuery(query, getOptions());

  const getMockData = () => {
    // Fetch json from local filesystem or call mock graphql server
    setMockHeader(true);
  };

  const runQuery = () => {
    if (MOCK === "ON") {
      getMockData();
    } else {
      getData();
    }
  };

  useEffect(() => {
    if (mockHeader) {
      getData();
    }
  }, [mockHeader]);

  useEffect(() => {
    if (queryError && MOCK === "AUTO") {
      getMockData()
    } else {
      setQueryResponse({
        loading: queryLoading,
        data: queryData,
        error: queryError
      });
    }
  }, [queryData, queryError, queryLoading]);

  return [runQuery, queryResponse];
};

export default useQueryMod;
