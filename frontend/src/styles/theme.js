import styled from "styled-components";

const Contain = styled.div`
  padding: 8px;
  text-align: center;
`;

const Background = styled(Contain)`
  background: url(${(props) => props.bgImg}) no-repeat center / cover;
`;

const BackgroundBlur = styled(Contain)`
  background: linear-gradient(
      310deg,
      rgba(20, 23, 39, 0.6),
      rgba(58, 65, 111, 0.6)
    ),
    url(${(props) => props.bgImg}) no-repeat center / cover;
`;

const BgBanner = styled(Background)`
  padding: 400px 0;
`;

const BgFooter = styled(Background)`
  padding: 100px 0;
`;

const BgLogin = styled(BackgroundBlur)`
  padding: 150px;
  height: 800px;
`;

const BgTable = styled(BackgroundBlur)`
  padding: 50px;
`;

const Banner = styled.img`
  padding: 50px;
  width: 100%;
`;

const BannerText = styled.div`
  font-size: 50px;
  color: white;
  p {
    font-size: 25px;
  }
`;

const HeaderText = styled.b`
  color: black;
`;

const Logo = styled.img`
  width: 50px;
`;

const Icon = styled(Contain)`
  font-size: 20px;
`;

export {
  Contain,
  BgBanner,
  BgFooter,
  BgLogin,
  BgTable,
  Banner,
  BannerText,
  HeaderText,
  Logo,
  Icon,
};
