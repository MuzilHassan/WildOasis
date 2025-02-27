import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";

import useCabins from "./useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;
function CabinTable() {
  const { isPending, data = [] } = useCabins();
  const [searchParams] = useSearchParams();

  const value = searchParams.get("discount") || "all";
  let filteredData;
  if (value === "all") filteredData = data;
  if (value === "no-discount")
    filteredData = data.filter((data) => data.discount == 0);
  if (value === "with-discount")
    filteredData = data.filter((data) => data.discount > 0);
  const sortVal = searchParams.get("sort") || "created_at-dsc";
  const [feild, order] = sortVal.split("-");
  const validator = order === "asc" ? 1 : -1;
  const sortedData = filteredData.sort(
    (a, b) => (a[feild] - b[feild]) * validator
  );
  if (isPending) return <Spinner />;
  if (data.length == 0) return <p>Your Database is currently empty</p>;
  return (
    <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
      <Table.TableHeader>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.TableHeader>
      <Table.TableBody
        data={sortedData}
        render={(cabin) => <CabinRow key={cabin?.id} cabin={cabin} />}
      />
    </Table>
  );
}

export default CabinTable;
