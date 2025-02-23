import React, { useState } from "react";
import { CButton, CListGroupItem } from "@coreui/react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const ListItem = ({ title, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <CListGroupItem
      className="d-flex justify-content-between align-items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {title}
      <div
        className="d-flex align-items-center"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <CButton
          className="me-2"
          style={{ padding: "0.2rem 0.5rem" }}
          onClick={onEdit}
        >
          <FaEdit style={{ color: "blue" }} />
        </CButton>
        <CButton style={{ padding: "0.2rem 0.5rem" }} onClick={onDelete}>
          <AiFillDelete style={{ color: "red" }} />
        </CButton>
      </div>
    </CListGroupItem>
  );
};

export default ListItem;
