// Random typings that are probably not accurate but I'm not an expert.
type ThunkType<A extends ActionType> = (d: DispatchType<A>) => any;
type ActionType = {
  type: "INITIAL" | string;
};

type FullActionType<A extends ActionType> = A | ThunkType<A>;
type DispatchType<A extends ActionType> = (action: FullActionType<A>) => void;
type ReducerType<T, A extends ActionType> = (prevState: T, action: A) => T;

interface StoreHolderType<T, A extends ActionType> {
  state: any;
  subscribers: ((state: any) => any)[];
  reducer?: ReducerType<T, A>;
}

export function createStore<T, A extends ActionType>(
  reducer: ReducerType<T, A>,
  initialState: T = null
) {
  // Establish a global object that contains the store, reducer, and subscriber list.
  let storeState: StoreHolderType<T, A> = {
    state: initialState,
    reducer,
    subscribers: [],
  };

  // Get the initial state of the store by passing in an initial state type and a null action.
  const firstRun = reducer(storeState.state, {
    type: "INITIAL",
  } as A);

  storeState = { state: firstRun, subscribers: [], reducer };

  // Create the root dispatch function. If the input type is a function, execute it and pass in the dispatch function.
  // else, pass the action to the store and call all subscribers.
  const dispatch: DispatchType<A> = (action) => {
    if (typeof action === "function") {
      action(dispatch);
    } else {
      storeState.state = reducer(storeState.state, action);
      storeState.subscribers.forEach((item) => item(storeState.state));
    }
  };

  // Subscribe to changes on the global store. Returns an index that can be used to unsubscribe efficiently.
  const subscribe = (listener: (state: T) => any) => {
    storeState.subscribers.push(listener);
    return storeState.subscribers.length - 1;
  };

  // Unsubscribe from the store using the subscriber's index.
  const unsubscribe = (index: number) => {
    storeState.subscribers = storeState.subscribers.filter(
      (x, i) => i !== index
    );
  };

  // Gets the latest version of the store.
  const getState = () => storeState.state;

  return {
    dispatch,
    subscribe,
    unsubscribe,
    getState,
  };
}
