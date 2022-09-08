import React from "react";
import "antd/dist/antd.min.css";
import { Space } from "antd";
import { BgFooter, BannerText } from "../../styles";

function Footer() {
  return (
    <div>
      <BgFooter bgImg="/assets/banners/footer.jpg">
        <Space size={200}>
          <BannerText>
            567
            <p>Images</p>
          </BannerText>
          <BannerText>
            10
            <p>Categories</p>
          </BannerText>
          <BannerText>
            100
            <p>Users</p>
          </BannerText>
        </Space>
      </BgFooter>
    </div>
  );
}

export default Footer;
