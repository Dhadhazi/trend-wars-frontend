type UserData = {
  token: string;
  permission: string;
};

export const loginUser = (data: UserData) => {
  return {
    type: "LOGIN_DATA",
    payload: { ...data },
  };
};

export const logOut = () => {
  localStorage.clear();
  return {
    type: "LOG_OUT",
  };
};
