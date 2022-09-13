import * as actionTypes from "./actionTypes";

function reducer(state, action) {
  // main side modal
  if (action.type === actionTypes.HANDLE_MODAL) {
    return {
      ...state,
      modalOpen: !state.modalOpen,
    };
  }

  // hero page routes
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

  // sets user
  if (action.type === actionTypes.SET_USER) {
    const user = action.payload;
    return {
      ...state,
      user: user,
    };
  }
  if (action.type === actionTypes.NO_USER) {
    return {
      ...state,
      user: "",
    };
  }

  // update user
  if (action.type === actionTypes.UPDATE_USER) {
    return {
      ...state,
      user: { ...state.user, ...action.payload },
    };
  }

  // set Admin
  if (action.type === actionTypes.SET_ADMIN) {
    return {
      ...state,
      isAdmin: action.payload,
    };
  }

  // set recent
  if (action.type === actionTypes.SET_RECENT) {
    return {
      ...state,
      recent: action.payload,
    };
  }

  return state;
}

export default reducer;
