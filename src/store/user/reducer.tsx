const initialState = {
  token: "",
  permission: "",
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case "LOGIN_DATA":
      return { ...state, ...action.payload };
    case "LOG_OUT":
      return { ...state, token: "", permission: "" };

    default:
      return state;
  }
};
