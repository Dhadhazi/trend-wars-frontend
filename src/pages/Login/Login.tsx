import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import "./Login.css";

import { LoginForm } from "./components/LoginForm";
import { RegistrationForm } from "./components/RegistrationForm";
import { showMessageWithTimeout } from "../../store/appState/actions";
import { loginUser } from "../../store/user/actions";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
      token
      permission
    }
  }
`;

const REGISTRATION = gql`
  mutation registerUser($email: String!, $password: String!) {
    registerUser(input: { email: $email, password: $password })
  }
`;

type LogRegForm = {
  email: string;
  password: string;
};

export const Login = () => {
  const [registrationMode, setRegistrationMode] = useState<boolean>(false);

  const dispatch = useDispatch();

  const [registerUserMutation] = useMutation(REGISTRATION, {
    onCompleted: (res) => {
      console.log("server res", res);
      if (res.registerUser) {
        dispatch(showMessageWithTimeout("success", "Registration successful!"));
        setRegistrationMode(false);
      } else {
        dispatch(showMessageWithTimeout("danger", "Email already registered"));
      }
    },
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  const [loginUserMutation] = useMutation(LOGIN_USER, {
    onCompleted: (res) => {
      console.log("server res", res);
      if (res.loginUser === null) {
        dispatch(showMessageWithTimeout("danger", "Wrong email/password"));
      } else {
        dispatch(loginUser(res.loginUser));
        dispatch(showMessageWithTimeout("success", "Login Successful"));
        localStorage.setItem("token", res.loginUser.token);
      }
    },
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  function toLogin() {
    setRegistrationMode(false);
  }

  function toRegister() {
    setRegistrationMode(true);
  }

  function login(data: LogRegForm) {
    loginUserMutation({
      variables: { email: data.email, password: data.password },
    });
  }

  function register(data: LogRegForm) {
    registerUserMutation({
      variables: { email: data.email, password: data.password },
    });
  }

  return registrationMode ? (
    <RegistrationForm onSubmitCB={register} toLogin={toLogin} />
  ) : (
    <LoginForm onSubmitCB={login} toRegistration={toRegister} />
  );
};
