import React from "react";
import { List, Avatar, Button } from "antd";

function ListDish({ categoryData }) {
  return (
    <>
      {categoryData ? (
        <List
          itemLayout="horizontal"
          dataSource={categoryData}
          renderItem={(item) => {
            return (
              <List.Item actions={[<Button danger>Eliminar</Button>]}>
                <List.Item.Meta
                  avatar={
                    <a
                      href={
                        item.images.length > 0 ? item.images[0].urlImage : null
                      }
                      target={"_blank"}
                    >
                      <Avatar
                        src={
                          item.images.length > 0
                            ? item.images[0].urlImage
                            : null
                        }
                        size={"large"}
                      />
                    </a>
                  }
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={item.description}
                />
                <div>Q. {item.price}</div>
              </List.Item>
            );
          }}
        />
      ) : (
        <h2>Cargando....</h2>
      )}
    </>
  );
}

export default ListDish;

{
  /* <List
          itemLayout="horizontal"
          dataSource={categories}
          renderItem={(item) => {
            return (
              <List.Item actions={[<Button danger>Eliminar</Button>]}>
                <List.Item.Meta
                  avatar={
                    <a href={item.urlImage} target={"_blank"}>
                      <Avatar src={item.urlImage} size={"large"} />
                    </a>
                  }
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={item.description}
                />
                <div>Q. {item.price}</div>
              </List.Item>
            );
          }}
        /> */
}
