import React from "react";
import { BiTrash } from "react-icons/bi";

const ListDelete = ({ DeleteSiteMap }) => {
  return (
    <div className="list-delete">
      <BiTrash className="deleteList button" onClick={() => DeleteSiteMap()} />
    </div>
  );
};

export default ListDelete;
