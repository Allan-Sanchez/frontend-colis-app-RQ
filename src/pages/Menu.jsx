import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Empty, Tag } from "antd";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getOneMenu } from "../utils/apiRestaurants";

// components
import CreateCategory from "../components/menu/CreateCategory";
import MyCollapse from "../components/menu/MyCollapse";

function Menu() {
  const params = useParams();
  const { isLoading, isError, data, error } = useQuery(
    ["menu", params.id],
    () => getOneMenu(params.id)
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <>
      <Row justify="center">
        <Col span={24} style={{ padding: 10 }}>
          <Row justify="end">
            <CreateCategory
              // restaurant={restaurant}
              paramsId={params.id}
              // setCategory={setCategory}
            />
          </Row>
        </Col>

        {data.length > 0 ? (
          <MyCollapse category={data} />
        ) : (
          <Empty
            description={<span>El restaurant no tiene menu todavia</span>}
          />
        )}
      </Row>
    </>
  );
}

export default Menu;
