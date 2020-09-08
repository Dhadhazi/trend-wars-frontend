import React from "react";
import styled, { keyframes } from "styled-components";

type Props = {
  head: number;
};

const direction = Math.floor(Math.random() * 200) - 100;
const rotation = Math.floor(Math.random() * 360);

const flyingAnimation = keyframes`
0% {
  opacity: 0;
  transform: rotate(0deg);
}

20% {
  opacity: 0.8;
}

90% {
  opacity: 1;
}

100% {
  transform: translateX(${direction}px) translateY(-200px) rotate(${rotation}deg);
  opacity: 0;
}
`;

const Head = styled.div<{ head: number }>`
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 4;
  background-image: url("/images/heads/${(props) => props.head}.png");
  animation: ${flyingAnimation} 2s linear forwards;
`;

export const Flyinghead = ({ head }: Props) => {
  return <Head head={head} />;
};
