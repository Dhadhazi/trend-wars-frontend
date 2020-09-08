const initialState = {
  token: "",
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case "LOGIN_DATA":
      return { ...state, ...action.payload };
    case "LOG_OUT":
      return { ...state, token: "", activity: [], budget: [], consumption: [] };

    default:
      return state;
  }
};
