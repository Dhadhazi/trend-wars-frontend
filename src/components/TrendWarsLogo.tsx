import React from "react";
import styled from "styled-components";

const Logo = styled.div`
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 72px;
  line-height: 107px;
  text-align: center;
  color: #3498db;
  text-shadow: none;

  @media (max-width: 650px) {
    font-size: 56px;
  }
`;

export const TrendWarsLogo = () => {
  return <Logo>TrendWars</Logo>;
};
