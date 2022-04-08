import React from "react";
import { Row, Button } from "antd";

function SocialMedia({ data }) {
  return (
    <>
      {data?.map((item) => {
        return (
          <div key={item.uuid}>
            <Row justify="center">
              <Button type="link" href={item.url} target="_blank">
                {item.type}
              </Button>
            </Row>
          </div>
        );
      })}
    </>
  );
}

export default SocialMedia;
