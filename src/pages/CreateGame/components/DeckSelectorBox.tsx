import React, { useState } from "react";
import styled from "styled-components";

const Accordion = styled.button<{ toggle: boolean }>`
  margin-top: 5px;

  width: 350px;
  height: 50px;
  border: none;
  background-color: ${(props) => (props.toggle ? "#3498db" : "#2980B9")};
  color: ${(props) => (props.toggle ? "#ECF0F1" : "#2C3E50")};
  font-size: 24px;
  :hover {
    cursor: pointer;
    background-color: #3498db;
    color: #ecf0f1;
  }
`;

const Description = styled.div`
  background-color: #c4c4c4;
  padding: 5px;
  width: 340px;
  font-size: 16px;
  color: #2c3e50;
  font-weight: 300;
`;

const Button = styled.button`
  display: block;
  border: none;
  width: 350px;
  height: 35px;
  background-color: #2980b9;
  color: #ecf0f1;
  margin-bottom: 5px;

  :hover {
    cursor: pointer;
    background-color: #2980b9;
    color: #2c3e50;
  }

  :active,
  :focus {
    transform: scale(0.98);
    background-color: #2980b9;
    color: #2c3e50;
  }
`;

type Props = {
  index: number;
  title: string;
  desc: string;
  id: string;
  gameDirectorCB: Function;
};

export const DeckSelectorBox = ({
  index,
  title,
  desc,
  id,
  gameDirectorCB,
}: Props) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  return (
    <div key={`accordion-${index}`}>
      <Accordion toggle={isToggled} onClick={() => setIsToggled(!isToggled)}>
        {title}
      </Accordion>
      {isToggled && (
        <>
          <Description>{desc}</Description>{" "}
          <Button
            onClick={() => {
              gameDirectorCB(id);
            }}
          >
            Select Deck
          </Button>
        </>
      )}
    </div>
  );
};
