import React, { useState } from "react";
import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import MyTable from "../components/restaurants/MyTable";
import { useQuery } from "react-query";

import { getRestaurants } from "../utils/apiRestaurants";

function Restaurants() {
  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery(
    "restaurants",
    getRestaurants
  );
  const handleNewRestauran = () => {
    navigate("/restaurant/new");
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  // console.log(data);

  return (
    <Row>
      <Col span={24} style={{ padding: 10 }}>
        <Row justify="end">
          <Button onClick={() => handleNewRestauran()} type="primary">
            New Restaurant
          </Button>
        </Row>
      </Col>
      <Col span={24}>
        <MyTable data={data} />
      </Col>
    </Row>
  );
}

export default Restaurants;
