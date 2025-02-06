import Filter from "../../ui/Filter";

import TableOperations from "../../ui/TableOperations";
import SortBy from "./SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        feildValue="discount"
        options={[
          { value: "all", label: "All " },
          { value: "no-discount", label: "No discount" },
          {
            value: "with-discount",
            label: "With discount",
          },
        ]}
      />
      <SortBy />
    </TableOperations>
  );
}

export default CabinTableOperations;
