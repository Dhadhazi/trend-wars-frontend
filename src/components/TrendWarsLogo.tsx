import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Logo = styled.div`
  font-family: Oswald, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 72px;

  text-align: center;
  color: #3498db;
  text-shadow: none;

  @media (max-width: 650px) {
    font-size: 34px;
  }
`;

export const TrendWarsLogo = () => {
  return (
    <Link to="/">
      <Logo>TrendWars</Logo>
    </Link>
  );
};
