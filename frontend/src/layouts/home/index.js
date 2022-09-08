import React from "react";
import "antd/dist/antd.min.css";
import { Row, Col } from "antd";
import { BgBanner, Banner, BannerText, P } from "../../styles";

function Home() {
  return (
    <div>
      <Row>
        <Col span={24}>
          <BgBanner bgImg="/assets/banners/home.jpg">
            <BannerText>This is My Web</BannerText>
          </BgBanner>
        </Col>
      </Row>
      <Row>
        <Col span={9} offset={3}>
          <Banner src="../assets/banners/home.png"></Banner>
        </Col>
        <Col span={9}>
          <P>
            azaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaassssssssssssssssssssssssssssssssssss
          </P>
        </Col>
      </Row>
      <Row>
        <Col span={9} offset={3}>
          <P>
            azaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaassssssssssssssssssssssssssssssssssss
          </P>
        </Col>
        <Col span={9}>
          <Banner src="../assets/banners/home.png"></Banner>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
