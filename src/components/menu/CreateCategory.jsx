import React, { useState, useContext } from "react";
import { Modal, Button, Form, Input, Spin } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { createMenu } from "../../utils/apiDish";

const { TextArea } = Input;

function CreateCategory({ paramsId }) {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const mutation = useMutation(createMenu, {
    onSuccess: () => {
      queryClient.invalidateQueries("menu");
    },
  });
  // console.log(paramsId);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // form
  const onFinish = async (values) => {
    setLoading(true);
    const restaurantId = parseInt(paramsId);
    const data = { ...values, restaurantId };
    mutation.mutate(data);
    handleOk();
    form.resetFields();
    // console.log(data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Crear Categoria
      </Button>
      <Modal
        title="Crear nueva Categoria"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Categoria"
            rules={[
              {
                required: true,
                message: "El nombre de la categoria es obligatorio.",
              },
            ]}
          >
            <Input
              placeholder="Escribe el nombre de la categoria"
              size="middle"
            />
          </Form.Item>
          <Form.Item label="Descripción:" name="description">
            <TextArea
              rows={2}
              placeholder="Escribe una descripcion si deseas"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            {mutation.isLoading ? (
              <Spin />
            ) : (
              <Button type="primary" htmlType="submit" size="middle">
                Guardar Categoria
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateCategory;
