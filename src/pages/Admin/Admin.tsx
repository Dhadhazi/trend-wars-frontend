import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

import "./Admin.css";

import { ApproveDecks } from "./components/ApproveDecks";
import { NormalButton } from "../../components/NormalButton";
import { EditDeck } from "./components/EditDeck";
import { showMessageWithTimeout } from "../../store/appState/actions";

import { Login } from "../Login/Login";
import { loginUser, logOut } from "../../store/user/actions";
import { selectUser } from "../../store/user/selectors";

const IS_ADMIN = gql`
  mutation isAdmin($token: String!) {
    isAdmin(token: $token)
  }
`;

export const Admin = () => {
  const [page, setPage] = useState<Number>(0);
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const localToken = localStorage.getItem("token");

  const [isAdminMutation] = useMutation(IS_ADMIN, {
    onCompleted: (res) => {
      if (res.isAdmin) {
        if (localToken)
          dispatch(loginUser({ token: localToken, permission: "Admin" }));
      } else {
        dispatch(
          showMessageWithTimeout("danger", "Please login as an Admin first")
        );
      }
    },
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  useEffect(() => {
    if (localToken) {
      isAdminMutation({
        variables: { token: localToken },
      });
    }
  }, [localToken, isAdminMutation]);

  if (userData.permission === "Admin") {
    return (
      <div className="flexbox-parent-middle-top">
        <div id="admin-menu-div">
          <NormalButton text="Approve Decks" onClick={() => setPage(1)} />
          <NormalButton text="Edit Decks" onClick={() => setPage(2)} />
          <NormalButton text="Log Out" onClick={() => dispatch(logOut())} />
        </div>
        <div id="admin-content-div">
          {page === 1 ? <ApproveDecks /> : ""}
          {page === 2 ? <EditDeck /> : ""}
        </div>
      </div>
    );
  } else {
    return <Login />;
  }
};
