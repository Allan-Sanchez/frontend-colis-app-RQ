import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import { getOneRestaurant } from "../utils/apiRestaurants";

// component
import CardInforRestaurant from "../components/restaurant/CardInforRestaurant";

function Restaurant() {
  const params = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery(
    ["restaurant", params.id],
  () => getOneRestaurant(params.id)
  );

  const handleRedirectToMenu = () => {
    // navigate(`/restaurant/${params.id}/menu`);
    navigate(`/restaurant/${params.id}/menu`);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Row justify="center">
      <Col span={24}>
        <Row justify="end">
          <Button onClick={() => handleRedirectToMenu()} type="primary">
            Menu
          </Button>
        </Row>
      </Col>
      <CardInforRestaurant restaurant={data} />
    </Row>
  );
}

export default Restaurant;
