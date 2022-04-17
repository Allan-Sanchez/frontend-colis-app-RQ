import React from "react";
import { Form, Input } from "antd";

const isAddressValidate = (value) => {
  if (value.length < 4) {
    return Promise.reject("La dirreccion debe de ser mayor a 4 digitos");
  }

  return Promise.resolve();
};

function MyFormAddress() {
  return (
    <Form.Item
      label="Direccion:"
      name="address"
      rules={[
        { required: true, message: "Por favor intruduce tu correo!" },
        () => ({
          validator(_, value) {
            return isAddressValidate(value);
          },
        }),
        { validateTrigger: "onBlur" },
      ]}
    >
      <Input />
    </Form.Item>
  );
}

export default MyFormAddress;
