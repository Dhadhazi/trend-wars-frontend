import React from "react";
import { useForm } from "react-hook-form";
import { NormalButton } from "../../../components/NormalButton";
import { BButton } from "../../../components/BButton";

type LoginForm = {
  email: string;
  password: string;
};

type Props = {
  onSubmitCB: Function;
  toRegistration: Function;
};

export const LoginForm = ({ onSubmitCB, toRegistration }: Props) => {
  const { register, handleSubmit } = useForm<LoginForm>({
    mode: "onBlur",
  });

  const onSubmit = handleSubmit((data: LoginForm) => {
    onSubmitCB(data);
  });

  return (
    <div className="flexbox-parent-middle-top flex-direction-column">
      <div id="title">Sign In</div>
      <div id="form">
        <form onSubmit={onSubmit}>
          <label htmlFor="inputEmail">Email address</label>
          <input
            type="email"
            ref={register({ required: true })}
            id="inputEmail"
            name="email"
            placeholder="Email address"
            required
            autoFocus
          />
          <div>
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              name="password"
              ref={register({ required: true })}
              id="inputPassword"
              placeholder="Password"
              required
            />
          </div>

          <BButton text="Sign in" onClick={() => {}} />
        </form>
      </div>
      <div id="register-div">
        Not a member yer?
        <NormalButton text="Register here!" onClick={toRegistration} />
      </div>
    </div>
  );
};
