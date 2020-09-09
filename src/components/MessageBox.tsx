import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { selectMessage } from "../store/appState/selectors";
import { clearMessage } from "../store/appState/actions";
import Slide from "../animations/Slide";

const Topbox = styled.div<{ variant: string }>`
  display: flex;
  font-size: 24px;
  background-color: ${(props) =>
    props.variant === "danger"
      ? "#E74C3C"
      : props.variant === "success"
      ? "#1CEB56"
      : "white"};
  width: 50vh;
`;

const Message = styled.div`
  flex-grow: 1;
  text-align: center;
`;

const CloseButton = styled.button`
  background-color: white;
  opacity: 0.3;
  width: 30px;
  border: none;
  outline: none;
  font-weight: 400;
  font-size: 24px;
  cursor: pointer;

  :hover {
    transform: scale(1.1);
  }
`;

export default function MessageBox() {
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();

  const showMessage = message !== null ? "show" : "";
  if (!showMessage) return null;

  return (
    <Slide isActive={true}>
      <Topbox variant={message.variant}>
        <Message>{message.text}</Message>
        <CloseButton onClick={() => dispatch(clearMessage())}>X</CloseButton>
      </Topbox>
    </Slide>
  );
}
