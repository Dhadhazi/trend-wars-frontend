import React from "react";
import styled from "styled-components";

type Props = {
  text: string;
  onClick: Function;
  disable?: boolean;
  selected: boolean;
};

const NButton = styled.button<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? "#3498db" : "#2980B9")};
  border: none;
  padding: 5px;
  width: 250px;
  display: inline;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: ${(props) => (props.selected ? "#ecf0f1" : "#2c3e50")};
  font-style: normal;
  font-size: 24px;
  text-align: center;
  margin: 10px;
  :hover {
    background-color: #3498db;
    color: #ecf0f1;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.5);
  }

  :disabled {
    background-color: #2c3e50;
    color: #ecf0f1;
  }
  :disabled::hover {
    background-color: #2c3e50;
    color: #ecf0f1;
  }

  @media (max-width: 650px) {
    width: 200px;
  }
`;

export const NormalButton = ({
  text,
  onClick,
  disable = false,
  selected = false,
}: Props) => {
  return (
    <NButton onClick={() => onClick()} disabled={disable} selected={selected}>
      {text}
    </NButton>
  );
};
