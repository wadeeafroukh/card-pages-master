import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { getCardById, updateCard } from "../services/cardService";
import { Card } from "../interfaces/Card";
import { errorMsg, successMsg } from "../services/feedBacks";

interface EditCardPageProps {}

const EditCardPage: FunctionComponent<EditCardPageProps> = () => {
  const [cardToEdit, setCardToEdit] = useState<Card | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (!id) return;
    const getCardToEdit = async (id: string) => {
      try {
        const res = await getCardById(id);
        setCardToEdit(res.data);
      } catch (error) {
        errorMsg("Something went wrong while fetching the card");
      }
    };
    getCardToEdit(id);
  }, [id]);
  const validationSchema = yup.object({
    title: yup.string().required().min(2),
    subtitle: yup.string().min(2),
    description: yup.string().required().min(10),
    phone: yup
      .string()
      .required()
      .matches(/^05\d{8}$/),
    email: yup.string().required().email(),
    web: yup.string().url().nullable(),
    image: yup.object({
      url: yup.string().required().url(),
      alt: yup.string().required().min(2),
    }),
    address: yup.object({
      state: yup.string(),
      country: yup.string().required(),
      city: yup.string(),
      street: yup.string(),
      houseNumber: yup.number().required(),
      zip: yup.number().required(),
    }),
  });

  const initialValues = cardToEdit
    ? {
        title: cardToEdit.title ?? "",
        subtitle: cardToEdit.subtitle ?? "",
        description: cardToEdit.description ?? "",
        phone: cardToEdit.phone ?? "",
        email: cardToEdit.email ?? "",
        web: cardToEdit.web ?? "",
        bizNumber: cardToEdit.bizNumber ?? 0,
        image: {
          url: cardToEdit.image?.url ?? "",
          alt: cardToEdit.image?.alt ?? "",
        },
        address: {
          state: cardToEdit.address.state ?? "",
          country: cardToEdit.address.country ?? "",
          city: cardToEdit.address.city ?? "",
          street: cardToEdit.address.street ?? "",
          houseNumber: cardToEdit.address.houseNumber ?? 0,
          zip: cardToEdit.address.zip ?? 0,
        },
      }
    : {
        title: "",
        subtitle: "",
        description: "",
        phone: "",
        email: "",
        web: "",
        bizNumber: 0,
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
      };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await updateCard(id as string, values);
        successMsg("Card updated successfully");
        navigate("/my-card");
      } catch (error) {
        errorMsg("Something went wrong while updating the card");
      }
    },
  });
  return (
    <>
      <div className=" container py-3 edit-card">
        <h1 className="text-center mb-3">Edit Card</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="row g-3">
            <div className=" col-12 col-md-6">
              <input
                className="form-control p-3"
                placeholder="Title"
                {...formik.getFieldProps("title")}
              />
            </div>

            <div className=" col-12 col-md-6">
              <input
                className="form-control p-3"
                placeholder="Subtitle"
                {...formik.getFieldProps("subtitle")}
              />
            </div>

            <div className=" col-12 col-md-6">
              <input
                className="form-control p-3"
                placeholder="Phone"
                {...formik.getFieldProps("phone")}
              />
            </div>

            <div className=" col-12 col-md-6">
              <input
                className="form-control p-3"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
            </div>

            <div className="col-md-12">
              <input
                className="form-control p-3"
                placeholder="Website"
                {...formik.getFieldProps("web")}
              />
            </div>

            <div className="col-12">
              <textarea
                className="form-control p-3"
                placeholder="Description"
                rows={3}
                {...formik.getFieldProps("description")}
              />
            </div>

            <div className=" col-12 col-md-6">
              <input
                className="form-control p-3"
                placeholder="Image URL"
                {...formik.getFieldProps("image.url")}
              />
            </div>

            <div className=" col-12 col-md-6">
              <input
                className="form-control p-3"
                placeholder="Image Alt"
                {...formik.getFieldProps("image.alt")}
              />
            </div>

            <div className=" col-12 col-md-6">
              <input
                className="form-control p-3"
                placeholder="State"
                {...formik.getFieldProps("address.state")}
              />
            </div>

            <div className=" col-12 col-md-6">
              <input
                className="form-control p-3"
                placeholder="Country"
                {...formik.getFieldProps("address.country")}
              />
            </div>

            <div className=" col-12 col-md-6">
              <input
                className="form-control p-3"
                placeholder="City"
                {...formik.getFieldProps("address.city")}
              />
            </div>

            <div className=" col-12 col-md-6">
              <input
                className="form-control p-3"
                placeholder="Street"
                {...formik.getFieldProps("address.street")}
              />
            </div>

            <div className=" col-12 col-md-6">
              <input
                type="number"
                className="form-control p-3"
                placeholder="House Number"
                {...formik.getFieldProps("address.houseNumber")}
              />
            </div>

            <div className=" col-12 col-md-6">
              <input
                type="number"
                className="form-control p-3"
                placeholder="Zip"
                {...formik.getFieldProps("address.zip")}
              />
            </div>
            <div className=" col-12 col-md-6">
              <input
                type="number"
                className="form-control p-3"
                placeholder="bizNumber"
                {...formik.getFieldProps("bizNumber")}
                disabled
              />
            </div>

            <div className="col-12 d-flex gap-2">
              <button type="submit" className="btn btn-primary w-100">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={() => navigate("/my-card")}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCardPage;
