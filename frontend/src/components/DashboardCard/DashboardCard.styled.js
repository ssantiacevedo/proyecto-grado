import styled from "styled-components";
import { palette } from "../../theme/palette";

export const IconText = styled.span`
  font-family: "Roboto";
  font-size: 13px;
  margin-left: 10px;
`;

export const Step1Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 30px;
  align-items: flex-start;
  z-index: 2;
`;

export const AddButon = styled.button`
  text-decoration: none;
  border: none;
  cursor: pointer;
  outline: none;
  justify-self: flex-end;
  border-radius: 8px;
  height: 45px;
  width: 30%;
  margin-bottom: 20px;
  background-color: ${palette.alpha600};
  color: white;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  justify-content: center;
`;

export const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.3rem;
  justify-content: center;
  width: 100%;

  & > * {
    margin-bottom: 0.5rem;
  }
`;

export const CardContainer = styled.div`
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.05);
  border-radius: 13px;
  background-color: ${palette.white};
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90%;
  width: 100%;
  z-index: 10;
  cursor: pointer;
`;
