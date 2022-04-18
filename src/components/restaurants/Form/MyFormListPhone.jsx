import React from "react";
import { Row, Col, Form, Space, InputNumber, Button, Select } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
const { Option } = Select;

const isPhoneValidate = (value) => {
  const numberValidate = value.toString();
  // console.log(numberValidate.length);
  if (numberValidate.length < 8 || numberValidate.length > 8) {
    return Promise.reject("El numero debe de ser de 8 digitos");
  }

  return Promise.resolve();
};
function MyFormListPhone() {
  return (
    <Row justify="end">
      <Col span={20}>
        <Form.List name="phone">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item name={[name, "type"]}>
                    <Select
                      defaultValue="inital"
                      style={{ width: 250 }}
                      // onChange={handleChange}
                    >
                      <Option value="inital">-- Selecciona un tipo --</Option>
                      <Option value="telefono">Telefono</Option>
                      <Option value="whatsapp">Whatsapp</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "phoneNumber"]}
                    rules={[
                      {
                        required: true,
                        message: "Escribir un numero de telefono!",
                      },
                      {
                        type: "integer",
                        message: "Este campo debe ser numerico",
                      },
                      () => ({
                        validator(_, value) {
                          return isPhoneValidate(value);
                        },
                      }),
                      { validateTrigger: "onBlur" },
                    ]}
                    wrapperCol={{ span: 20 }}
                  >
                    <InputNumber
                      style={{ width: 200 }}
                      placeholder="numero telefonico"
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Agregregar Numeros de telefono
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Col>
    </Row>
  );
}

export default MyFormListPhone;
