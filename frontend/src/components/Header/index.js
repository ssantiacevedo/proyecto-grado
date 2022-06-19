import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Logo,
  TopContainer,
  HelpButton,
  RulesContainer,
  Rule,
  RuleDescription,
  LogoutButton,
} from "./Header.styled";
import { usePopper } from "../../helpers/usePopper";
import Popper from "../Popper";
import LogoUdelar2 from "../../assets/udelarLogo2.svg";
import { useDataContext } from "../../context/Context";

const Header = () => {
  const [referenceElement, setReferenceElement] = useState(null);
  const { popperOpen, togglePopper } = usePopper(`help-popper`);
  const { token, logout } = useDataContext();
  return (
    <>
      <Container>
        <TopContainer>
          <Link to="/dashboard">
            <Logo src={LogoUdelar2} alt="Elitegrad logo" />
          </Link>
          {token && <LogoutButton onClick={logout}> <FontAwesomeIcon icon={faSignOutAlt} /> Logout</LogoutButton>}
          <HelpButton ref={setReferenceElement} onClick={togglePopper}>
            Rules
          </HelpButton>
        </TopContainer>
      </Container>
      <Popper white show={popperOpen} referenceElement={referenceElement}>
        <RulesContainer>
          <Rule>
            <span>Rule #1:</span>
            <RuleDescription>Database Table to OWL Classes</RuleDescription>
          </Rule>
          <Rule>
            <span>Rule #2:</span>
            <RuleDescription>
              Associative Table to Object Properties
            </RuleDescription>
            <RuleDescription>
              You need to map at least one element from the Object Property
              domain and one from the range to be valid
            </RuleDescription>
          </Rule>
          <Rule>
            <span>Rule #3:</span>
            <RuleDescription>
              Database Columns (No FK) to Data Properties
            </RuleDescription>
          </Rule>
          <Rule>
            <span>Rule #4:</span>
            <RuleDescription>
              Database Columns (No FK) to OWL Classes
            </RuleDescription>
          </Rule>
          <Rule>
            <span>Rule #5:</span>
            <RuleDescription>
              Database Columns (FK) to Object Properties
            </RuleDescription>
          </Rule>
        </RulesContainer>
      </Popper>
    </>
  );
};

export default Header;
