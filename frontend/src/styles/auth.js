import styled from "styled-components";
import { Contain } from "./theme";

const ContentBox = styled.div`
  display: inline-block;
  padding 32px;
  width: 300px;
  height: 450px;
  border-radius: 5%;
  box-shadow:  0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: white;
  span, button, svg {
    border-radius: 10px;
  }
`;

const LogoSignIn = styled(Contain)`
  font-size: 30px;
`;

const AuthFormButton = styled.div`
  button {
    height: 35px;
    width: 215px;
    background-image: linear-gradient(
      45deg,
      rgb(0, 200, 255),
      rgb(248, 0, 198)
    );
    width: 100%;
    color: white;
    border: 0cm;
  }
`;

export { LogoSignIn, ContentBox, AuthFormButton };
