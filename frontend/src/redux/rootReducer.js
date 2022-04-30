import { LOG_IN, LOG_OUT } from "./action-types.js";

const initialState = {
  user: {},
  dummyData: "dummy string",
};
function rootReducer(state = initialState, action) {
/* --------------------------------- LOG_IN --------------------------------- */
  if (action.type === LOG_IN) {
    console.log("adding user...");
    console.log(
      "the payload is ",
      action.payload,
      " and the current state is ",
      state
    );
    const updated_state = Object.assign({}, state, {
      user: action.payload,
    });
    console.log("the updated state is ", updated_state);
    return updated_state;
  }
/* --------------------------------- LOG_OUT -------------------------------- */
  if (action.type === LOG_OUT) {
    console.log("removing user...");
    console.log(
      "the payload is ",
      action.payload,
      " and the current state is ",
      state
    );
    console.log("the updated state is ", initialState);
    return initialState;
  }
/* -------------------------- return-default-state -------------------------- */
  return state;
}

export default rootReducer;
