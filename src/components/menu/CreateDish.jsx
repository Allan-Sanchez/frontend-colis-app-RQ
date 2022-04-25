import React, { useContext, useState } from "react";
import { Modal, Button, Form, Input, Upload, InputNumber, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ImageContext from "../../context/ImageContext";
import { uploadImageDish } from "../../utils/uploadImage";
import { createDish } from "../../utils/apiDish";
import { useMutation, useQueryClient } from "react-query";
const { TextArea } = Input;
// componenst

function CreateDish({ categoryData }) {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const { pathImage, setPreviewSource } = useContext(ImageContext);
  const mutation = useMutation(createDish, {
    onSuccess: () => {
      queryClient.invalidateQueries("menu");
    },
  });
  // const
  const [form] = Form.useForm();

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
    setSaveLoading(true);
    delete values.upload;

    const menuId = categoryData.id;
    const restaurantId = categoryData.restaurantId;
    // upload image to cloudinary
    const responseImage = await uploadImageDish(pathImage);
    const data = { ...values, ...responseImage, menuId, restaurantId };

    mutation.mutate(data);
    handleOk();
    setSaveLoading(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // image
  const normFile = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.file);
    reader.onloadend = async () => {
      setPreviewSource(reader.result);
    };

    if (Array.isArray(e)) {
      return e;
    }
    return e;
  };

  const beforeUpload = ({ file, fileList, event }) => {
    return false;
    //Using Hooks to update the state to the current filelist
    //filelist - [{uid: "-1",url:'Some url to image'}]
  };
  return (
    <>
      <Button className="button-success" onClick={showModal}>
        Nuevo Platillo
      </Button>
      <Modal
        title={`Nuevo platillo`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          labelCol={{ span: 6 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* TODO:: the categoriID i have to get the other method */}
          {/* <Form.Item label="categoria" name="categoryId"> */}
          {/* <Select placeholder="Selecciona la Categoria">
              {categories.map((category) => {
                return (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                );
              })}
            </Select> */}
          {/* </Form.Item> */}

          <Form.Item
            label="Image:"
            name="upload"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "La image del restaurante es necesaria",
              },
            ]}
          >
            <Upload
              name="logo"
              listType="picture"
              maxCount={1}
              beforeUpload={beforeUpload}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="name"
            label="Platillo"
            rules={[
              {
                required: true,
                message: "El nombre del platillo es necesario",
              },
            ]}
          >
            <Input placeholder="Escribe el nombre del platillo" size="middle" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descripcion"
            rules={[
              {
                required: true,
                message: "La descripcion del platillo es necesario",
              },
            ]}
          >
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Precio"
            rules={[
              {
                required: true,
                message: "El precio es obligatorio",
              },
            ]}
          >
            <InputNumber placeholder="Precio" addonAfter="Q" size="middle" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            {saveLoading ? (
              <Spin />
            ) : (
              <Button type="primary" htmlType="submit" size="middle">
                Guardar Platillo
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateDish;
