import styled from "styled-components";

const P = styled.p`
  padding: 50px;
  text-align: center;
  word-wrap: break-word;
`;

const Img = styled.div`
  padding: 8px;
  word-wrap: break-word;
  img {
    position: relative;
    width: 100%;
    object-fit: cover;
    border-radius: 5%;
  }
`;

const IconButton = styled.div`
  float: right;
`;

const TableWrapper = styled.div`
  display: inline-block;
  padding: 50px;
  width: 90%;
  border-radius: 5%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: white;
`;

export { P, Img, IconButton, TableWrapper };
