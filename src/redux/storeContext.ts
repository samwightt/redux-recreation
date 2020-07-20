import { createStore } from "./createStore";
import { createContext } from "react";

// Create an empty store context that doesn't actually do anything for the initial value.
const emptyStore: ReturnType<typeof createStore> = {
  dispatch: (action) => {},
  subscribe: (listener) => -1,
  unsubscribe: (index) => {},
  getState: () => {},
};

export const StoreContext = createContext(emptyStore);

export const StoreProvider = StoreContext.Provider;
