import { useEffect, useContext, useState } from "react";
import { StoreContext } from "./storeContext";

/**
 * Accepts in a selector and returns the value of the store the selector selects (whew, that's a mouthful.)
 * @param selector A function that accepts in the store and returns a subset of it.
 */
export const useSelector = (selector: (state: any) => any) => {
  const { getState, subscribe, unsubscribe } = useContext(StoreContext);
  const [substate, setSubstate] = useState(selector(getState()));

  useEffect(() => {
    let index = subscribe((newState) => {
      setSubstate((_) => selector(newState));
    });

    return () => {
      unsubscribe(index);
    };
  }, []);

  return substate;
};
