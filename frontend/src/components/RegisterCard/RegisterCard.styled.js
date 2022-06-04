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
  margin-top: 10px;
  align-items: flex-start;
  z-index: 2;
`;

export const AddButon = styled.button`
  text-decoration: none;
  border: none;
  cursor: pointer;
  outline: none;
  border-radius: 8px;
  height: 35px;
  width: 50%;
  opacity: ${(props) => (props.disabled ? "0.7" : "1")};
  margin-top: 10px;
  background-color: ${palette.alpha600};
  color: white;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-bottom: 10px;
`;

export const Label = styled.span`
  font-family: "Roboto";
  font-weight: 600;
  color: ${palette.alpha600};
  font-size: 15px;
  text-align: center;
  margin: 0.5rem 0;
`;

export const Input = styled.input`
  display: inline-block;
  padding: 6px 12px;
  margin: 3px 0;
  font-family: "Roboto";
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid ${palette.beta800gray};
  color: ${palette.beta800gray};
  outline: none;
  width: 50%;
`;

export const LoginLink = styled.span`
  font-family: "Roboto";
  font-size: 14px;

  a { 
    font-weight: 600;
    color: ${palette.alpha600};
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }

  margin-top: 20px;
`;