import React, { useState, useEffect } from "react";
import { gql, useSubscription, useMutation } from "@apollo/client";

import { Flyinghead } from "./Flyinghead";

const HEADSPACE_SUP = gql`
  subscription HeadSpace($gameId: String!) {
    HeadSpace(gameId: $gameId) {
      heads
    }
  }
`;

const DELETE_SPACE = gql`
  mutation deleteSpace($gameId: String!) {
    deleteSpace(gameId: $gameId)
  }
`;

type Props = {
  gameId: string;
};

export const HeadSender = ({ gameId }: Props) => {
  const [headList, setHeadList] = useState<number[]>([]);

  const [deleteSpaceMutation] = useMutation(DELETE_SPACE, {
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  useSubscription(HEADSPACE_SUP, {
    variables: { gameId: gameId },
    onSubscriptionData: ({ subscriptionData }) => {
      setHeadList(subscriptionData.data.HeadSpace.heads);
    },
  });

  useEffect(() => {
    const cleanup = () => {
      deleteSpaceMutation({
        variables: {
          gameId: gameId,
        },
      });
    };
    window.addEventListener("beforeunload", cleanup);

    return () => {
      cleanup();
    };
  }, [deleteSpaceMutation, gameId]);

  return (
    <div>
      {headList.map((h: number, i: number) => (
        <Flyinghead head={h} key={i} />
      ))}
    </div>
  );
};
