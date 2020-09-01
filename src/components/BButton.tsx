import React from "react";
import styled from "styled-components";

type Props = {
  text: string;
  onClick: Function;
  disable?: boolean;
};

const BigButton = styled.button`
  background-color: #2980b9;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #ecf0f1;
  font-style: normal;
  font-size: 42px;
  text-align: center;
  margin: 10px;
  :hover {
    background-color: #2980b9;
    color: #2c3e50;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.5);
  }

  :active,
  :focus {
    transform: scale(0.98);
    background-color: #2980b9;
    color: #2c3e50;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  :disabled {
    background-color: #2c3e50;
    color: #ecf0f1;
  }
  :disabled::hover {
    background-color: #2c3e50;
    color: #ecf0f1;
  }
`;

export const BButton = ({ text, onClick, disable = false }: Props) => {
  return (
    <BigButton onClick={() => onClick()} disabled={disable}>
      {text}
    </BigButton>
  );
};
