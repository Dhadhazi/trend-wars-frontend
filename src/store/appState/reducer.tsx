const initialState = {
  message: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return { ...state, message: action.payload };

    case "CLEAR_MESSAGE":
      return { ...state, message: null };

    default:
      return state;
  }
};
