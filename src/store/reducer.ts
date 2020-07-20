const initialState = {
  count: 0,
};

type ActionType =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "INITIAL" };

/**
 *
 * @param prevState The previous state.
 * @param action The action to match against.
 */
const reducer = (prevState = initialState, action: ActionType) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...prevState,
        count: prevState.count + 1,
      };
    case "DECREMENT":
      return {
        ...prevState,
        count: prevState.count - 1,
      };
    case "INITIAL":
      return initialState;
    default:
      return prevState;
  }
};

export default reducer;
