import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import useBookings from "./useBookings";
import Pagination from "../../ui/Pagination";
function BookingTable() {
  const { isPending, error, isError, bookings = [], count } = useBookings();

  if (isError)
    return (
      <p>
        {error.message || "Something went wrong while fectching bookings data"}
      </p>
    );
  if (isPending) return <Spinner />;

  if (bookings.length == 0) return <Empty resource={"bookings"} />;
  return (
    <Table columns={"0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem"}>
      <Table.TableHeader>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.TableHeader>

      <Table.TableBody
        data={bookings}
        render={(booking) => <BookingRow key={booking?.id} booking={booking} />}
      />
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default BookingTable;
