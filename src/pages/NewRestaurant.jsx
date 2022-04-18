import React, { useContext, useState } from "react";
import { Card, Form, Button, Row, Spin } from "antd";
import { useNavigate } from "react-router-dom";

import { useMutation } from "react-query";
import { uploadImage } from "../utils/uploadImage";
import { addRestaurant } from "../utils/apiRestaurants";
import { getFormatTime } from "../utils/times";
import ImageContext from "../context/ImageContext";

// componets
import MyFormName from "../components/restaurants/Form/MyFormName";
import MyFormAddress from "../components/restaurants/Form/MyFormAddress";
import MyFormImage from "../components/restaurants/Form/MyFormImage";
import MyFormHours from "../components/restaurants/Form/MyFormHours";
import MyFormDescription from "../components/restaurants/Form/MyFormDescription";
import MyFormListPhone from "../components/restaurants/Form/MyFormListPhone";
import MyFormListSocialMedia from "../components/restaurants/Form/MyFormListSocialMedia";

function NewRestaurant() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const mutation = useMutation(addRestaurant);
  const { pathImage } = useContext(ImageContext);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values) => {
    setLoading(true);

    const responseImage = await uploadImage(pathImage);
    const hourOpen = getFormatTime(values.open._d);
    const hourClose = getFormatTime(values.close._d);
    // delete fields object
    delete values.open;
    delete values.close;
    delete values.upload;

    const data = { ...values, ...responseImage, hourClose, hourOpen };
    // console.log(data);
    mutation.mutate(data, {
      onSettled: () => setLoading(false),
    });
    navigate("/");
  };

  return (
    <Row justify="center">
      <Card
        title="Crear Restaurante"
        style={{ width: 900 }}
        headStyle={{ textAlign: "center" }}
      >
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 13 }}
          initialValues={{ remember: true }}
          onFinishFailed={onFinishFailed}
          onFinish={onFinish}
        >
          <MyFormName />
          <MyFormAddress />

          <MyFormImage />
          <MyFormHours />
          <MyFormDescription />

          <MyFormListPhone />
          <MyFormListSocialMedia />

          <Form.Item wrapperCol={{ offset: 18, span: 6 }}>
            {loading ? (
              <Spin />
            ) : (
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
}

export default NewRestaurant;
