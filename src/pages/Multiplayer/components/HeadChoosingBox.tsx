import React, { useState } from "react";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";

const SEND_HEAD = gql`
  mutation sendHead($gameId: String, $head: Int) {
    sendHead(gameId: $gameId, head: $head)
  }
`;

const HeadBox = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const HeadButton = styled.button<{ head: number }>`
  height: 100px;
  width: 100px;
  background-color: Transparent;
  background-image: url("/images/heads/${(props) => props.head}.png");
  border: none;
  outline: none;
  cursor: pointer;
  transform: scale(1);

  :hover {
    transform: scale(1.05);
  }

  :active,
  :focus {
    transform: scale(0.95);
  }

  :disabled {
    filter: grayscale(100%);
  }
`;

type Props = {
  gameId?: string;
};

export const HeadChoosingBox = ({ gameId = "" }: Props) => {
  const [pushed, setPushed] = useState<boolean>(false);

  const [sendHeadMutation] = useMutation(SEND_HEAD, {
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  function headPushed(headNumber: number) {
    setPushed(true);

    sendHeadMutation({
      variables: {
        gameId: gameId,
        head: headNumber,
      },
    });
    setTimeout(() => setPushed(false), 2000);
    // dispatch(newHead(headNumber));
  }

  return (
    <HeadBox>
      <HeadButton
        head={1}
        disabled={pushed}
        onClick={() => {
          headPushed(1);
        }}
      />
      <HeadButton
        head={2}
        disabled={pushed}
        onClick={() => {
          headPushed(2);
        }}
      />
      <HeadButton
        head={3}
        disabled={pushed}
        onClick={() => {
          headPushed(3);
        }}
      />
      <HeadButton
        head={4}
        disabled={pushed}
        onClick={() => {
          headPushed(4);
        }}
      />
      <HeadButton
        head={5}
        disabled={pushed}
        onClick={() => {
          headPushed(5);
        }}
      />
      <HeadButton
        head={6}
        disabled={pushed}
        onClick={() => {
          headPushed(6);
        }}
      />
    </HeadBox>
  );
};
