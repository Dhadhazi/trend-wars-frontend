import React from "react";
import { useForm } from "react-hook-form";
import { NormalButton } from "../../../components/NormalButton";
import { BButton } from "../../../components/BButton";

type RegistrationForm = {
  email: string;
  password: string;
};

type Props = {
  onSubmitCB: Function;
  toLogin: Function;
};

export const RegistrationForm = ({ onSubmitCB, toLogin }: Props) => {
  const { register, handleSubmit } = useForm<RegistrationForm>({
    mode: "onBlur",
  });

  const onSubmit = handleSubmit((data: RegistrationForm) => {
    onSubmitCB(data);
  });

  return (
    <div className="flexbox-parent-middle-top flex-direction-column">
      <div id="title">Registration</div>
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
          <BButton text="Register" onClick={() => {}} />
        </form>
      </div>
      <div id="register-div">
        <NormalButton text="Back to Login" onClick={toLogin} />
      </div>
    </div>
  );
};
