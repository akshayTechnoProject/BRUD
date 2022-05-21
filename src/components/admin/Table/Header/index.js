import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ headers, onSorting }) => {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };

  return (
    <tr>
      {headers.map(({ name, field, sortable }) => (
        <th
          key={name}
          onClick={() => (sortable ? onSortingChange(field) : null)}
          scope="col"
          style={{ width: "auto" }}
        >
          {name}

          {sortingField && sortingField === field && (
            <FontAwesomeIcon
              icon={sortingOrder === "asc" ? "arrow-down" : "arrow-up"}
            />
          )}
        </th>
      ))}
    </tr>
  );
};

export default Header;
