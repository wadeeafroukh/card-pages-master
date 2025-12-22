import { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { addNewUser } from "../services/usersService";
import { errorMsg, successMsg } from "../services/feedBacks";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      imageUrl: "",
      imageAlt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
      isBusiness: false,
    },
    validationSchema: yup.object({
      firstName: yup.string().required().min(2),
      lastName: yup.string().min(2),
      email: yup.string().required().email(),
      password: yup
        .string()
        .required()
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*-]).{7,}$/),
      phone: yup
        .string()
        .required()
        .matches(/^05\d([-]?\d){7}$/),
      state: yup.string(),
      country: yup.string().required(),
      city: yup.string(),
      street: yup.string(),
      houseNumber: yup.string().matches(/^\d+$/),
      zip: yup.string().required().matches(/^\d+$/),
    }),
    onSubmit: async (values) => {
      const payload = {
        name: {
          first: values.firstName,
          middle: values.middleName,
          last: values.lastName,
        },
        phone: values.phone,
        email: values.email,
        password: values.password,
        image: {
          url: values.imageUrl || "https://via.placeholder.com/150",
          alt: values.imageAlt || "User Image",
        },
        address: {
          state: values.state,
          country: values.country,
          city: values.city,
          street: values.street,
          houseNumber: Number(values.houseNumber),
          zip: Number(values.zip),
        },
        isBusiness: values.isBusiness,
      };

      try {
        const res = await addNewUser(payload);
        successMsg("Registration successfuly, please login");
        navigate("/login");
      } catch (err: any) {
        console.log(err.response?.data || err);

        errorMsg(err.response?.data || "Registration failed");
      }
    },
  });

  return (
    <div className="container gap-4 p-5">
      <h1 className="text-center mb-5">Register</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              className="form-control  p-3"
              placeholder="First Name"
              {...formik.getFieldProps("firstName")}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control  p-3"
              placeholder="Middle Name"
              {...formik.getFieldProps("middleName")}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control  p-3"
              placeholder="Last Name"
              {...formik.getFieldProps("lastName")}
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control  p-3"
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />
          </div>
          <div className="col-md-6">
            <input
              type="password"
              className="form-control  p-3"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control  p-3"
              placeholder="Phone"
              {...formik.getFieldProps("phone")}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control  p-3"
              placeholder="State"
              {...formik.getFieldProps("state")}
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control  p-3"
              placeholder="Country"
              {...formik.getFieldProps("country")}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control  p-3"
              placeholder="City"
              {...formik.getFieldProps("city")}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control  p-3"
              placeholder="Street"
              {...formik.getFieldProps("street")}
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control  p-3"
              placeholder="House Number"
              {...formik.getFieldProps("houseNumber")}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control  p-3"
              placeholder="Zip"
              {...formik.getFieldProps("zip")}
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control  p-3"
              placeholder="Image URL"
              {...formik.getFieldProps("imageUrl")}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control  p-3"
              placeholder="Image Alt"
              {...formik.getFieldProps("imageAlt")}
            />
          </div>

          <div className="col-12  form-check">
            <input
              type="checkbox"
              name="isBusiness"
              className="form-check-input"
              checked={formik.values.isBusiness}
              onChange={() =>
                formik.setFieldValue("isBusiness", !formik.values.isBusiness)
              }
              onBlur={() => formik.setFieldTouched("isBusiness", true)}
            />
            <label className="form-check-label">Sign up as business</label>
          </div>

          <div className="col-12">
            <button
              className="btn btn-primary w-100"
              disabled={!formik.isValid || !formik.dirty}
              type="submit"
            >
              Register
            </button>
          </div>
        </div>
      </form>

      <Link to="/login" className="d-block text-center mt-3">
        Already a user? Login
      </Link>
    </div>
  );
};

export default Register;
