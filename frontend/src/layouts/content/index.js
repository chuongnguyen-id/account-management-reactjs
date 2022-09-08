import React from "react";
import "antd/dist/antd.min.css";
import { Row, Col, Image, Tabs, Pagination, Avatar, Card } from "antd";
import { Img, Icon } from "../../styles";

function Content() {
  const { TabPane } = Tabs;
  const { Meta } = Card;
  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab="Tab Title 1" key="1">
          <Row>
            <Col span={6}>
              <Img>
                <Card
                  cover={<Image alt="" src="../assets/banners/photo.png" />}
                >
                  <Meta
                    avatar={<Avatar src="logo512.png" />}
                    title="Card title"
                    description="Design by Account1"
                  />
                </Card>
              </Img>
            </Col>
            <Col span={6}>
              <Img>
                <Card
                  cover={<Image alt="" src="../assets/banners/photo.png" />}
                >
                  <Meta
                    avatar={<Avatar src="logo512.png" />}
                    title="Card title"
                    description="Design by Account1"
                  />
                </Card>
              </Img>
            </Col>
            <Col span={6}>
              <Img>
                <Card
                  cover={<Image alt="" src="../assets/banners/photo.png" />}
                >
                  <Meta
                    avatar={<Avatar src="logo512.png" />}
                    title="Card title"
                    description="Design by Account1"
                  />
                </Card>
              </Img>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Tab Title 2" key="2">
          <Row>
            <Col span={6}>
              <Img>
                <Card
                  cover={<Image alt="" src="../assets/banners/photo.png" />}
                >
                  <Meta
                    avatar={<Avatar src="logo512.png" />}
                    title="Card title"
                    description="Design by Account1"
                  />
                </Card>
              </Img>
            </Col>
            <Col span={6}>
              <Img>
                <Card
                  cover={<Image alt="" src="../assets/banners/photo.png" />}
                >
                  <Meta
                    avatar={<Avatar src="logo512.png" />}
                    title="Card title"
                    description="Design by Account1"
                  />
                </Card>
              </Img>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Tab Title 3" key="3">
          <Row>
            <Col span={6}>
              <Img>
                <Card
                  cover={<Image alt="" src="../assets/banners/photo.png" />}
                >
                  <Meta
                    avatar={<Avatar src="logo512.png" />}
                    title="Card title"
                    description="Design by Account1"
                  />
                </Card>
              </Img>
            </Col>
            <Col span={6}>
              <Img>
                <Card
                  cover={<Image alt="" src="../assets/banners/photo.png" />}
                >
                  <Meta
                    avatar={<Avatar src="logo512.png" />}
                    title="Card title"
                    description="Design by Account1"
                  />
                </Card>
              </Img>
            </Col>
            <Col span={6}>
              <Img>
                <Card
                  cover={<Image alt="" src="../assets/banners/photo.png" />}
                >
                  <Meta
                    avatar={<Avatar src="logo512.png" />}
                    title="Card title"
                    description="Design by Account1"
                  />
                </Card>
              </Img>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
      <Icon>
        <Pagination defaultCurrent={6} total={500} />
      </Icon>
    </div>
  );
}

export default Content;
