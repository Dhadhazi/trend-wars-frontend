import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import "./Login.css";

import { LoginForm } from "./components/LoginForm";
import { RegistrationForm } from "./components/RegistrationForm";

const REGISTRATION = gql`
  mutation registerUser($email: String!, $password: String!) {
    registerUser(input: { email: $email, password: $password })
  }
`;

type LogRegForm = {
  email: string;
  password: string;
  rememberme: boolean;
};

export const Login = () => {
  const [registrationMode, setRegistrationMode] = useState<boolean>(false);

  const [registerUserMutation] = useMutation(REGISTRATION, {
    onCompleted: (res) => {
      if (res.registerUser) {
        console.log("Registration successful");
      } else {
        console.log("Email already registered");
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
    console.log(data);
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
