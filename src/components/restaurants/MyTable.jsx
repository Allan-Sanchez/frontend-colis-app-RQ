import React from "react";
import { Table, Space, Avatar, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Column } = Table;

function MyTable({ data }) {
  const navigate = useNavigate();
  const handleDelete = (id) => {
    console.log(id);
  };
  const handleRestaurantMenu = (id) => {
    navigate(`/restaurant/${id}`);
  };
  return (
    <Table dataSource={data} rowKey={(item) => item.id}>
      <Column title="Nombre" dataIndex="name" key="name" />
      <Column
        responsive={["sm"]}
        title="imagen"
        dataIndex="images"
        render={(info) => {
          return (
            <Space size="middle">
              <Avatar
                size={60}
                src={info.length > 0 ? info[0].urlImage : null}
              />
            </Space>
          );
        }}
      />
      <Column
        responsive={["md"]}
        title="Direccion"
        dataIndex="address"
        key="address"
      />
      <Column
        title="Acciones"
        render={(info, render) => {
          return (
            <Space>
              <Button
                type="primary"
                onClick={() => handleRestaurantMenu(render.id)}
              >
                ver
              </Button>
              <Button danger onClick={() => handleDelete(render.id)}>
                Eliminar
              </Button>
            </Space>
          );
        }}
      />
    </Table>
  );
}

export default MyTable;
