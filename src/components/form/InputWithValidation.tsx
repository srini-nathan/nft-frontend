import { FormikProps } from "formik";
import { ElementType } from "react";
import Form from "react-bootstrap/Form";

export const InputWithValidation = ({
  label,
  formik,
  id,
  type,
  placeholder,
  as,
}: {
  label: string;
  formik: FormikProps<any>;
  id: string;
  type?: string;
  placeholder: string;
  as?: ElementType<any>;
}) => {
  return (
    <Form.Group>
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <Form.Control
        id={id}
        type={type}
        as={as}
        placeholder={placeholder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[id] ?? ""}
        isInvalid={formik.touched[id] && !!formik.errors[id]}
        isValid={formik.touched[id] && !formik.errors[id]}
      />
      <Form.Control.Feedback type="invalid">
        {formik.errors[id]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
