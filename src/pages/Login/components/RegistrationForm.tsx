import React from "react";
import { useForm } from "react-hook-form";

type RegistrationForm = {
  email: string;
  password: string;
};

type Props = {
  onSubmitCB: Function;
  toSignUp: Function;
};

export const RegistrationForm = ({ onSubmitCB, toSignUp }: Props) => {
  const { register, handleSubmit } = useForm<RegistrationForm>({
    mode: "onBlur",
  });

  const onSubmit = handleSubmit((data: RegistrationForm) => {
    onSubmitCB(data);
  });

  return (
    <div className="row justify-content-center">
      <div className="row">
        <div className="card card-signin my-5">
          <div className="card-body">
            <h5 className="card-title text-center">Sign In</h5>
            <form className="form-signin" onSubmit={onSubmit}>
              <div className="form-label-group">
                {" "}
                <label htmlFor="inputEmail">Email address</label>
                <input
                  type="email"
                  ref={register({ required: true })}
                  id="inputEmail"
                  name="email"
                  className="form-control"
                  placeholder="Email address"
                  required
                  autoFocus
                />
              </div>
              <div className="form-label-group">
                {" "}
                <label htmlFor="inputPassword">Password</label>
                <input
                  type="password"
                  name="password"
                  ref={register({ required: true })}
                  id="inputPassword"
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>

              <button
                className="btn btn-lg btn-primary btn-block text-uppercase"
                type="submit"
              >
                Register
              </button>
            </form>{" "}
            <div className="register">
              <button
                className="btn btn-sm"
                onClick={() => {
                  toSignUp(false);
                }}
              >
                Back to Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
