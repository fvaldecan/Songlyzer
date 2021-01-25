import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension"; // To see state in browser

const store = createStore(rootReducer, composeWithDevTools());
export default store;
