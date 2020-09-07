import React, { useState } from "react";
import { ApproveDecks } from "./components/ApproveDecks";
import { NormalButton } from "../../components/NormalButton";
import "./Admin.css";

export const Admin = () => {
  const [page, setPage] = useState<Number>(1);

  return (
    <div className="flexbox-parent-middle-top">
      <div id="admin-menu-div">
        <NormalButton text="Approve Decks" onClick={() => setPage(1)} />
      </div>
      <div id="admin-content-div">{page === 1 ? <ApproveDecks /> : ""}</div>
    </div>
  );
};
