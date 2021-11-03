import styled from 'styled-components';
import { palette } from "../../theme/palette";

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  height: 7rem;
  justify-content: center;
  width: 100%;
  margin: auto;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5%;
  margin-top: 4rem;
  align-items: center;
  border-radius: 16px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
    0px 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 50px 10px;
  overflow: hidden;
  height: fit-content;
  max-height: 80vh;
`;

export const Title = styled.div`
  font-family: "RobotoBold";
  font-size: 18px;
  text-align: center;
`;

export const SubTitle = styled.div`
  font-family: "Roboto";
  font-size: 15px;
  text-align: center;
  margin-top: 10px;
  color: ${palette.black};
`;

export const ToggleButton = styled.button`
  text-decoration: none;
  border: none;
  cursor: pointer;
  outline: none;
  border-radius: 8px;
  height: 40px;
  width: 90%;
  margin: 0 auto;
  max-width: 200px;
  margin-top: 20px;
  background-color: white;
  color: ${palette.alpha600};
  border: 1px solid ${palette.alpha600};
`;

export const ReferenceContainer = styled.div`
  display: grid;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  grid-template-columns: 1.5rem 1fr;
  grid-column-gap: 20px;
`;

export const MappedClass = styled.div`
  height: 15px;
  background-color: #5dbb63;
  border-radius: 5px;
`;

export const NotMappedClass = styled.div`
  height: 15px;
  background-color: rgb(51, 102, 204);
  border-radius: 5px;
`;

export const MappedProperties = styled.div`
  height: 2px;
  background-color: #5dbb63;
`;

export const NotMappedProperties = styled.div`
  height: 2px;
  background-color: black;
`;

export const DataProperties = styled.div`
  height: 15px;
  background-color: #ffff00;
  border-radius: 5px;
`;

export const SubClass = styled.div`
  border: 1px dashed black;
`;

export const ReferenceTitle = styled.span`
  margin-bottom: 5px;
`;

export const TotalMappingSameAs = styled.div`
  height: 2px;
  background-color: #CC5500;
`;

export const StyledCardContainer = styled(CardContainer)`
  position: ${props => props.fixed ? 'absolute' : ''};
  bottom: ${props => props.fixed ? '10px' : ''};
  left: ${props => props.fixed ? '10px' : ''};
  padding: 10px;
`;

export const Label = styled.span`
  font-family: "Roboto";
  font-size: 15px;
  text-align: left;
  color: ${palette.black};
`;