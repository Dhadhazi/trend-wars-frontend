import React from "react";
import { useForm } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
  rememberme: boolean;
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
              <div className="custom-control custom-checkbox mb-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                  ref={register()}
                  name="rememberme"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember Me
                </label>
              </div>
              <button
                className="btn btn-lg btn-primary btn-block text-uppercase"
                type="submit"
              >
                Sign in
              </button>
            </form>
            <div className="register" onClick={() => toRegistration(true)}>
              Not a member yer?{" "}
              <button
                className="btn btn-sm"
                onClick={() => toRegistration(true)}
              >
                Register here!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
