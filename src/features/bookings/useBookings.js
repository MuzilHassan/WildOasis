import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sort = searchParams.get("sort") || "startDate-desc";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { feild: "status", value: filterValue, operator: "eq" };
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const {
    isPending,
    isError,
    data: { bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getBookings(filter, sort, page),
  });

  return { isPending, bookings, count, isError, error };
}

export default useBookings;
