import * as actionTypes from "./actionTypes";
function reducer(state, action) {
  if (action.type === actionTypes.HANDLE_MODAL) {
    return {
      ...state,
      modalOpen: !state.modalOpen,
    };
  }
  if (action.type === actionTypes.SET_CURRENT_ROUTE) {
    return {
      ...state,
      currRoute: action.payload,
    };
  }
  if (action.type === actionTypes.ROUTE_CHANGE) {
    if (action.payload === state.currRoute) return state;
    return {
      ...state,
      preRoute: state.currRoute,
      currRoute: action.payload,
    };
  }
  return state;
}

export default reducer;
