import { FunctionComponent } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { errorMsg, successMsg } from "../services/feedBacks";
import { createCard } from "../services/cardService";
import { url } from "inspector";

interface CreateCardProps {}

type CreateCardValues = {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: {
    url: string;
    alt: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
};

const CreateCard: FunctionComponent<CreateCardProps> = () => {
  const navigate = useNavigate();

  const formik = useFormik<CreateCardValues>({
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      image: {
        url: "",
        alt: "",
      },
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: 0,
        zip: 0,
      },
    },
    validationSchema: yup.object({
      title: yup.string().min(2, "Title must be at least 2 characters"),

      subtitle: yup.string().min(2, "Subtitle must be at least 2 characters"),

      description: yup
        .string()
        .required("Description is required")
        .min(2, "Description must be at least 10 characters"),

      phone: yup
        .string()
        .required("Phone is required")
        .matches(/^05\d{8}$/, "Phone must be a valid Israeli number"),

      email: yup
        .string()
        .required("Email is required")
        .email("Must be a valid email"),

      web: yup.string().url("Must be a valid URL"),

      image: yup.object({
        url: yup
          .string()
          .url("Image URL must be valid")
          .required("Image URL is required"),
        alt: yup
          .string()
          .required("Image alt is required")
          .min(2, "Alt must be at least 2 characters"),
      }),

      address: yup.object({
        country: yup.string().required("Country is required"),
        state: yup.string(),
        city: yup.string(),
        street: yup.string(),
        houseNumber: yup
          .number()
          .typeError("House number must be a number")
          .moreThan(0, "House number must be greater than 0"),
        zip: yup
          .number()
          .typeError("Zip must be a number")
          .required("Zip is required")
          .moreThan(0, "Zip must be greater than 0"),
      }),
    }),
    onSubmit: async (values) => {
      const payload = {
        ...values,
        wepsite: values.web.trim() || "",
        image: {
          url: values.image.url?.trim() || "https://via.placeholder.com/150",
          alt: values.image.alt?.trim() || "Card Image",
        }
      }
      try {
        await createCard(values as any);
        successMsg("Card created successfully");
        navigate("/my-card");
      } catch (error: any) {
        errorMsg(error?.response?.data?.message ?? "Error creating card");
      }
    },
  });

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center p-3">
        <h1>Create Card</h1>
      </div>

      <div className="container py-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                className="form-control p-3"
                placeholder="Title"
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title && (
                <div className="text-danger mt-1">{formik.errors.title}</div>
              )}
            </div>

            <div className="col-md-6">
              <input
                className="form-control p-3"
                placeholder="Subtitle"
                {...formik.getFieldProps("subtitle")}
              />
              {formik.touched.subtitle && formik.errors.subtitle && (
                <div className="text-danger mt-1">{formik.errors.subtitle}</div>
              )}
            </div>

            <div className="col-md-6">
              <input
                className="form-control p-3"
                placeholder="Phone (05XXXXXXXX)"
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-danger mt-1">{formik.errors.phone}</div>
              )}
            </div>

            <div className="col-md-6">
              <input
                className="form-control p-3"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger mt-1">{formik.errors.email}</div>
              )}
            </div>

            <div className="col-md-12">
              <input
                className="form-control p-3"
                placeholder="Website (https://...)"
                {...formik.getFieldProps("web")}
              />
              {formik.touched.web && formik.errors.web && (
                <div className="text-danger mt-1">{formik.errors.web}</div>
              )}
            </div>

            <div className="col-12">
              <textarea
                className="form-control p-3"
                placeholder="Description"
                rows={3}
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-danger mt-1">
                  {formik.errors.description}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <input
                className="form-control p-3"
                placeholder="Image URL"
                {...formik.getFieldProps("image.url")}
              />
              {formik.touched.image?.url &&
                (formik.errors.image as any)?.url && (
                  <div className="text-danger mt-1">
                    {(formik.errors.image as any)?.url}
                  </div>
                )}
            </div>

            <div className="col-md-6">
              <input
                className="form-control p-3"
                placeholder="Image Alt"
                {...formik.getFieldProps("image.alt")}
              />
              {formik.touched.image?.alt &&
                (formik.errors.image as any)?.alt && (
                  <div className="text-danger mt-1">
                    {(formik.errors.image as any)?.alt}
                  </div>
                )}
            </div>

            <div className="col-md-6">
              <input
                className="form-control p-3"
                placeholder="State"
                {...formik.getFieldProps("address.state")}
              />
              {formik.touched.address?.state &&
                (formik.errors.address as any)?.state && (
                  <div className="text-danger mt-1">
                    {(formik.errors.address as any)?.state}
                  </div>
                )}
            </div>

            <div className="col-md-6">
              <input
                className="form-control p-3"
                placeholder="Country"
                {...formik.getFieldProps("address.country")}
              />
              {formik.touched.address?.country &&
                (formik.errors.address as any)?.country && (
                  <div className="text-danger mt-1">
                    {(formik.errors.address as any)?.country}
                  </div>
                )}
            </div>

            <div className="col-md-6">
              <input
                className="form-control p-3"
                placeholder="City"
                {...formik.getFieldProps("address.city")}
              />
              {formik.touched.address?.city &&
                (formik.errors.address as any)?.city && (
                  <div className="text-danger mt-1">
                    {(formik.errors.address as any)?.city}
                  </div>
                )}
            </div>

            <div className="col-md-6">
              <input
                className="form-control p-3"
                placeholder="Street"
                {...formik.getFieldProps("address.street")}
              />
              {formik.touched.address?.street &&
                (formik.errors.address as any)?.street && (
                  <div className="text-danger mt-1">
                    {(formik.errors.address as any)?.street}
                  </div>
                )}
            </div>

            <div className="col-md-6">
              <input
                type="number"
                className="form-control p-3"
                placeholder="House Number"
                {...formik.getFieldProps("address.houseNumber")}
              />
              {formik.touched.address?.houseNumber &&
                (formik.errors.address as any)?.houseNumber && (
                  <div className="text-danger mt-1">
                    {(formik.errors.address as any)?.houseNumber}
                  </div>
                )}
            </div>

            <div className="col-md-6">
              <input
                type="number"
                className="form-control p-3"
                placeholder="Zip"
                {...formik.getFieldProps("address.zip")}
              />
              {formik.touched.address?.zip &&
                (formik.errors.address as any)?.zip && (
                  <div className="text-danger mt-1">
                    {(formik.errors.address as any)?.zip}
                  </div>
                )}
            </div>

            <div className="col-12">
              <button className="btn btn-primary w-100" type="submit">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCard;
