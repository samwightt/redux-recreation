import { useContext } from "react";
import { StoreContext } from "./storeContext";

/**
 * Returns the dispatch function for dispatching actions.
 */
export const useDispatch = () => {
  const store = useContext(StoreContext);
  return store.dispatch;
};
