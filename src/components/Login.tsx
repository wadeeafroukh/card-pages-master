import { useFormik } from "formik";
import { FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { setToken, userLogin } from "../services/authService";
import { errorMsg, successMsg } from "../services/feedBacks";
import { User } from "../interfaces/User";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format")
        .min(5, "At least 5 characters"),

      password: yup
        .string()
        .required("Password is required")
        .matches(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{7,}$/,
          "Password must be at least 7 chars and include 1 uppercase letter, 1 number, 1 symbol"
        ),
    }),
    onSubmit: async (values) => {
      try {
      const res = await userLogin(values.email, values.password)
      const token = res.data.token ?? res.data;
      setToken(token);
      navigate("/")
      successMsg("Welcome back")
    } catch (error) {
      errorMsg("Somthing went wrong, try again")
    }
  },
  });
  return (
    <>
      <div className=" container-fluid text-center p-5 gap-4">
        <h1>Login</h1>

        <form
          onSubmit={formik.handleSubmit}
          className="container d-flex justify-content-center w-100 p-3 flex-column align-items-center gap-3"
        >
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="email">Email address</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="password">Password</label>
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
          </div>
          <button
            disabled={!formik.isValid || !formik.dirty}
            type="submit"
            className="btn btn-primary mt-3"
          >
            Login
          </button>
        </form>
        <Link to={"/register"}>New user? Register here</Link>
      </div>
    </>
  );
};

export default Login;
