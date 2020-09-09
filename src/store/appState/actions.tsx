export const clearMessage = () => ({ type: "CLEAR_MESSAGE" });

export const setMessage = (variant: string, text: string) => {
  return {
    type: "SET_MESSAGE",
    payload: {
      variant,
      text,
    },
  };
};

export const showMessageWithTimeout = (variant: string, text: string) => {
  return (dispatch: any) => {
    dispatch(setMessage(variant, text));

    setTimeout(() => dispatch(clearMessage()), 5000);
  };
};
