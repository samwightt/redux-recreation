import { createStore } from "../redux";
import reducer from "./reducer";

// Creates the root store instance.
const store = createStore(reducer);

export default store;
