const initialState = {
  head: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case "NEW_HEAD_LIST":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
