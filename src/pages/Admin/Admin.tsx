import React, { useState } from "react";
import { ApproveDecks } from "./components/ApproveDecks";
import { NormalButton } from "../../components/NormalButton";
import "./Admin.css";
import { EditDeck } from "./components/EditDeck";

export const Admin = () => {
  const [page, setPage] = useState<Number>(2);

  return (
    <div className="flexbox-parent-middle-top">
      <div id="admin-menu-div">
        <NormalButton text="Approve Decks" onClick={() => setPage(1)} />
        <NormalButton text="Edit Decks" onClick={() => setPage(2)} />
      </div>
      <div id="admin-content-div">
        {page === 1 ? <ApproveDecks /> : ""}
        {page === 2 ? <EditDeck /> : ""}
      </div>
    </div>
  );
};
