import React from "react";
import { ErrorMessage } from "formik";

const FormError = ({ name }) => {
  return (
    <div style={{ color: "red", fontSize:'10px' }}>
      <br />
      <ErrorMessage name={name} />
    </div>
  );
};

export default FormError;