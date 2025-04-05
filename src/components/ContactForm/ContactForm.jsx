import { Field, Form, Formik, ErrorMessage } from "formik";
import css from "./ContactForm.module.css";
import * as yup from "yup";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

const SHORT_ERROR_MESSAGE = "Too short!";
const LONG_ERROR_MESSAGE = "Too long!";
const REQUIRED_ERROR_MESSAGE = "Required field";

const initialValues = {
  name: "",
  number: "",
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, SHORT_ERROR_MESSAGE)
    .max(50, LONG_ERROR_MESSAGE)
    .required(REQUIRED_ERROR_MESSAGE),
  number: yup
    .string()
    .min(3, SHORT_ERROR_MESSAGE)
    .max(50, LONG_ERROR_MESSAGE)
    .required(REQUIRED_ERROR_MESSAGE),
});

function ContactForm() {
  const dispatch = useDispatch();

  function handleSubmit(values, actions) {
    const newRecord = {
      name: values.name,
      number: values.number,
    };

    dispatch(addContact(newRecord));
    actions.resetForm();
  }

  const formId = useId();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <div className={css["field-container"]}>
          <label htmlFor={formId + "-name"}>Name</label>
          <Field name="name" id={formId + "-name"} />
          <ErrorMessage name="name" component="span" className={css.error} />
        </div>
        <div className={css["field-container"]}>
          <label htmlFor={formId + "-number"}>Number</label>
          <Field name="number" id={formId + "-number"} />
          <ErrorMessage name="number" component="span" className={css.error} />
        </div>
        <button type="submit">Add Contact</button>
      </Form>
    </Formik>
  );
}

export default ContactForm;
