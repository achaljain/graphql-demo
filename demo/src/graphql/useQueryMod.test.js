import { renderHook, act } from "@testing-library/react-hooks";
import useQueryMod from "./useQueryMod";
import { getUser } from "./queries";
import { wait } from "@testing-library/react";

test("hook", () => {
  const { result } = renderHook(() =>
    useQueryMod(getUser, {
      variables: "user1"
    })
  );

  wait(() => {
    act(() => {
      result.current[0]();
    });
    console.log(result.current, "++++++++");
  });
});
