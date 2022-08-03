function reducer(state, action) {
  if (action.type === "HANDLE_MODAL") {
    return {
      ...state,
      modalOpen: !state.modalOpen,
    };
  }
  return state;
}

export default reducer;
